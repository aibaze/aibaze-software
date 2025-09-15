'use client'
import { siteConfig } from '@/lib/config';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { api } from '@/api';
import axios from 'axios';

export default function Contact({ showForm = false }: { showForm?: boolean }) {
  const [formData, setFormData] = useState({
    email: '',
    description: '',
    budget: '',
    name: '',
    whereDidYouHearFromUs: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const payload = {
        ...formData,
        budget: formData.budget ? Number(formData.budget) : undefined
      };

      const response = await api.post('/users/feedback', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitStatus('success');
        setSubmitMessage('Thank you for your feedback! We will get back to you soon.');
        setFormData({ // Clear form on success
          email: '',
          description: '',
          budget: '',
          name: '',
          whereDidYouHearFromUs: ''
        });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(`Something went wrong: ${response.statusText}. Please try again.`);
      }
    } catch (error) {
      setSubmitStatus('error');
      if (axios.isAxiosError(error) && error.response) {
        setSubmitMessage(`Error submitting feedback: ${error.response.data?.message || error.message}. Please check your input and try again.`);
      } else {
        setSubmitMessage('An unexpected error occurred. Please try again later.');
        console.error('Submission error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center ">
            <h1 className="h1 mb-4">Contact Us</h1>
            <h1 className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">
              Schedule a <a target="_blank" href={siteConfig.ctaLink} className="text-gray-500 hover:text-gray-700">call</a> or fill out the form below
            </h1>
          </div>

          {/* Custom Form */}
          {showForm && (
            <div className="mt-12 max-w-2xl mx-auto">
              {/* Simple Submission Status Message */}
              {submitStatus !== 'idle' && (
                 <p className={`mb-4 text-sm ${submitStatus === 'error' ? 'text-gray-500' : 'text-gray-700'}`}>
                   {submitMessage}
                 </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4">
                
                  
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      placeholder="Enter your email"
                       disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name (Optional)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter your name"
                       disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="description">What do you need help with?</Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                      placeholder="Explain your idea with detail"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                       disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="budget">Budget (Optional)</Label>
                    <Input
                      id="budget"
                      type="number"
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      placeholder="Enter your budget for this project"
                       disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="whereDidYouHearFromUs">Where did you hear from us? (Optional)</Label>
                    <Input
                      id="whereDidYouHearFromUs"
                      value={formData.whereDidYouHearFromUs}
                      onChange={(e) => setFormData({...formData, whereDidYouHearFromUs: e.target.value})}
                      placeholder="e.g., Google, LinkedIn, etc."
                       disabled={isSubmitting}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
