'use client'
import { useState, useEffect } from 'react';
import { agenticallerApi } from '@/api';

// Function to generate MongoDB-like ObjectId
function generateObjectId() {
  const timestamp = Math.floor(new Date().getTime() / 1000).toString(16).padStart(8, '0');
  const machineId = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  const processId = Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
  const counter = Math.floor(Math.random() * 16777216).toString(16).padStart(6, '0');
  
  return timestamp + machineId + processId + counter;
}

interface Reminder {
  _id?: string;
  id: string;
  title: string;
  internalLabel: string;
  callPurpose: string;
  calleeName: string;
  callPurposeSummary: string;
  recurrence: string;
  phoneNumber: string;
  time: string; // We'll use string for the UI but convert to Date when sending to backend
}

export default function ReminderManager() {
  // State for user ID
  const [userId, setUserId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
    
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [formData, setFormData] = useState<Omit<Reminder, '_id' | 'id'>>({
    title: '',
    internalLabel: '',
    callPurpose: '',
    calleeName: '',
    callPurposeSummary: '',
    recurrence: 'one-time',
    phoneNumber: '',
    time: ''
  });

  // Constant for maximum allowed reminders
  const MAX_REMINDERS = 3;
  // Check if the user has reached the maximum limit
  const hasReachedLimit = reminders.length >= MAX_REMINDERS;

  // Fetch reminders for the current user
  const fetchReminders = async (currentUserId: string) => {
    if (!currentUserId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await agenticallerApi.get(`/call-reminders/user/${currentUserId}`);
      if (response.data && response.data.data.callReminders) {
        setReminders(response.data.data.callReminders);
      }
    } catch (err) {
      console.error('Error fetching reminders:', err);
      setError('Failed to load your reminders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Initialize userId from localStorage or generate a new one
  useEffect(() => {
    // Try to get userId from localStorage
    let storedUserId = localStorage.getItem('agenticallerUserId');
    
    // If not found, generate a new one and store it
    if (!storedUserId) {
      storedUserId = generateObjectId();
      localStorage.setItem('agenticallerUserId', storedUserId);
    }
    
    setUserId(storedUserId);
    
    // Fetch reminders once we have a userId
    fetchReminders(storedUserId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({formData});
    
    // Parse the time in local timezone and convert to UTC properly
    let timeString = '';
    
    if (formData.time) {
      // Parse the time input (which is in HH:MM format)
      const [hours, minutes] = formData.time.split(':').map(Number);
      
      // Create a date object with today's date and the specified time in local timezone
      const localDateTime = new Date();
      localDateTime.setHours(hours, minutes, 0, 0);
      
      // The most straightforward way to convert local time to UTC
      // is to use the built-in toISOString method.
      // JavaScript Date objects handle timezone conversions automatically
      timeString = localDateTime.toISOString();
      
      // For debugging
      console.log('Local time:', localDateTime.toString());
      console.log('UTC time:', timeString);
      
      // Example conversion for GMT+7:
      // If local time is 23:50 GMT+7, UTC time should be 16:50
      const localTimeFormatted = localDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const utcTimeObj = new Date(timeString);
      const utcTimeFormatted = utcTimeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
      console.log(`Time conversion: ${localTimeFormatted} local → ${utcTimeFormatted} UTC`);
    } else {
      // If no time provided, use current time in UTC
      timeString = new Date().toISOString();
    }
    
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...formData,
      time: timeString
    };
    
    console.log({newReminder});
    
    setLoading(true);
    setError(null);
    
    try {
      // Include userId in the API request
      await agenticallerApi.post('/call-reminders', {
        ...newReminder,
        userId: userId
      });
      
      // Fetch updated reminders after successfully creating a new one
      await fetchReminders(userId);
      
      setFormData({
        title: '',
        internalLabel: '',
        callPurpose: '',
        calleeName: '',
        callPurposeSummary: '',
        recurrence: 'daily',
        phoneNumber: '',
        time: ''
      });
    } catch (err) {
      console.error('Error creating reminder:', err);
      setError('Failed to create your reminder. Please try again.');
      // Still add to local state for better UX even if the API call failed
      setReminders([...reminders, newReminder]);
    } finally {
      setLoading(false);
    }
  };

  // Get the user's current timezone for display
  const getUserTimezone = () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const date = new Date();
      const offset = date.getTimezoneOffset();
      const offsetHours = Math.abs(Math.floor(offset / 60));
      const offsetMinutes = Math.abs(offset % 60);
      const offsetSign = offset < 0 ? '+' : '-';
      const formattedOffset = `GMT${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;
      return `${timezone} (${formattedOffset})`;
    } catch (error) {
      return 'Unknown timezone';
    }
  };

  const handleDelete = async (id: string) => {
    // Optimistically update UI
    setReminders(reminders.filter(reminder => reminder._id !== id));
    
    try {
      await agenticallerApi.delete(`/call-reminders/${id}`);
      
      // Fetch updated reminders after successful deletion
      await fetchReminders(userId);
    } catch (err) {
      console.error('Error deleting reminder:', err);
      // Revert the optimistic update on error
      await fetchReminders(userId);
    }
  };

  // Common input class with improved padding - using brand colors
  const inputClass = "py-3 px-4 block w-full text-foreground rounded-lg border border-border shadow-sm focus:border-primary focus:ring-primary bg-background/50";
  const iconInputClass = "pl-10 py-3 px-4 block w-full text-foreground rounded-lg border border-border shadow-sm focus:border-primary focus:ring-primary bg-background/50";

  return (
    <div className="flex gap-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 min-h-screen">
      {/* Form Section - Now on the left */}
      <div className="w-1/2 bg-card rounded-xl shadow-xl p-8 border border-border">
        <h2 className="text-3xl font-bold mb-6 text-primary">Create Call Reminder</h2>
        {error && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
            {error}
          </div>
        )}
        {hasReachedLimit && (
          <div className="mb-4 p-4 bg-amber-100 border border-amber-300 rounded-md text-amber-800">
            <p className="font-medium">Maximum limit of {MAX_REMINDERS} reminders reached!</p>
            <p className="text-sm mt-1">If you would like to increase your limit, please contact us at <a href="mailto:info.agenticaller@gmail.com" className="text-blue-600 hover:underline">info.agenticaller@gmail.com</a></p>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className={inputClass}
              required
              placeholder="Enter reminder title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Phone Number
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground sm:text-sm">📞</span>
              </div>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className={iconInputClass}
                required
                placeholder="+15551234567"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Callee Name
            </label>
            <input
              type="text"
              value={formData.calleeName}
              onChange={(e) => setFormData({ ...formData, calleeName: e.target.value })}
              className={inputClass}
              required
              placeholder="Who will you be calling?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Internal Label
            </label>
            <input
              type="text"
              value={formData.internalLabel}
              onChange={(e) => setFormData({ ...formData, internalLabel: e.target.value })}
              className={inputClass}
              placeholder="For internal identification only"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Call Purpose (Im calling to...) [Up to 3 sentences]
            </label>
            <textarea
              value={formData.callPurpose}
              onChange={(e) => setFormData({ ...formData, callPurpose: e.target.value })}
              className={inputClass}
              rows={3}
              placeholder="Remind you about taking your medication now, go to the second floor, enter your room, and take your medication in the second drawer."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Short Summary (Im calling to...) [Up to 1 sentence]
            </label>
            <textarea
              value={formData.callPurposeSummary}
              onChange={(e) => setFormData({ ...formData, callPurposeSummary: e.target.value })}
              className={inputClass}
              rows={2}
              placeholder="Remind you about your medication"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Time
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-muted-foreground sm:text-sm">⏰</span>
              </div>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className={iconInputClass}
                required
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              Select the time for the call reminder in your local timezone: <span className="font-medium text-primary">{getUserTimezone()}</span>
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Recurrence
            </label>
            <select
              value={formData.recurrence}
              onChange={(e) => setFormData({ ...formData, recurrence: e.target.value })}
              className={inputClass}
            >
              <option value="one-time">One Time</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading || hasReachedLimit}
            className={`w-full ${loading || hasReachedLimit ? 'bg-primary/70 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-primary-foreground py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors duration-200 flex items-center justify-center font-medium text-lg`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : hasReachedLimit ? (
              <>
                <span className="mr-2">🔒</span> Limit Reached
              </>
            ) : (
              <>
                <span className="mr-2">📱</span> Create Call Reminder
              </>
            )}
          </button>
        </form>
      </div>

      {/* Preview Section - Now on the right */}
      <div className="w-1/2 bg-card rounded-xl shadow-xl p-8 border border-border">
        <h2 className="text-3xl font-bold mb-6 text-primary">Your Call Reminders</h2>
        {loading && !error && (
          <div className="flex justify-center items-center py-10">
            <svg className="animate-spin h-10 w-10 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <div key={reminder._id} className="bg-accent/10 p-6 rounded-lg border border-border hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{reminder.title}</p>
                      <p className="text-sm text-primary">{reminder.calleeName} • {reminder.phoneNumber}</p>
                      {reminder.internalLabel && (
                        <p className="text-xs text-muted-foreground font-medium">{reminder.internalLabel}</p>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 bg-card p-3 rounded-md border border-border">
                    <p className="text-foreground">{reminder.callPurpose}</p>
                    {reminder.callPurposeSummary && (
                      <p className="text-sm text-muted-foreground mt-2 italic">Summary: {reminder.callPurposeSummary}</p>
                    )}
                  </div>
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {new Date(reminder.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="mx-2">•</span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      {reminder.recurrence}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(reminder._id||"")}
                  className="text-destructive hover:text-destructive/90 bg-destructive/10 ml-2 px-3 py-2 rounded-md hover:bg-destructive/20 transition-colors duration-200 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {!loading && reminders.length === 0 && (
            <div className="text-center py-12 bg-accent/10 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-primary font-medium">No call reminders yet</p>
              <p className="text-muted-foreground text-sm mt-2">Create your first call reminder using the form</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 