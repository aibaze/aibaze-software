'use client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { aibazeApi as api } from '@/api';

export default function VideoLandingPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    reason: '',
    whereDidYouHearFromUs: '',
    phone: '',
    website: '',
    whatYouWillUseAiFor: '',
    businessName: '',
    requestedService: '',
    targetDate: '',
    phoneOptIn: false,
    internalCompany: 'aibaze',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    reason: '',
    whereDidYouHearFromUs: '',
    whatYouWillUseAiFor: '',
    businessName: '',
    targetDate: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      reason: '',
      whereDidYouHearFromUs: '',
      whatYouWillUseAiFor: '',
      businessName: '',
      targetDate: '',
    };

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.reason.trim()) {
      newErrors.reason = 'Please tell us about your project';
    } else if (formData.reason.trim().length < 50) {
      newErrors.reason =
        'Please provide more details about your project (at least 50 characters)';
    }

    if (!formData.whereDidYouHearFromUs.trim()) {
      newErrors.whereDidYouHearFromUs = 'Please select how you heard about us';
    }

    if (!formData.whatYouWillUseAiFor.trim()) {
      newErrors.whatYouWillUseAiFor = 'Please select what you will use AI for';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    } else if (formData.businessName.trim().length < 2) {
      newErrors.businessName = 'Please provide a valid business name';
    }

    if (!formData.targetDate.trim()) {
      newErrors.targetDate = 'Target date is required';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    setIsLoading(true);
    setSubmitError('');

    try {
      const response = await api.post(
        '/contact-us',
        {
          ...formData,
          description: formData.reason,
          whereDidYouHearFromUs: formData.whereDidYouHearFromUs,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Show success message
      setIsSubmitted(true);
    } catch (error: any) {
      console.error('Error submitting form:', error);

      // Handle different types of errors
      if (error.response?.status === 429) {
        setSubmitError('Too many requests. Please try again in a few minutes.');
      } else if (error.response?.status >= 500) {
        setSubmitError(
          'Server error. Please try again later or contact us directly.'
        );
      } else if (error.response?.status === 400) {
        setSubmitError(
          'Invalid data. Please check your information and try again.'
        );
      } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
        setSubmitError(
          'Network error. Please check your connection and try again.'
        );
      } else {
        setSubmitError(
          'Something went wrong. Please try again or contact us directly.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError('');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      reason: '',
      whereDidYouHearFromUs: '',
      phone: '',
      website: '',
      whatYouWillUseAiFor: '',
      businessName: '',
      requestedService: '',
      targetDate: '',
      phoneOptIn: false,
      internalCompany: 'aibaze',
    });
    setErrors({
      name: '',
      email: '',
      reason: '',
      whereDidYouHearFromUs: '',
      whatYouWillUseAiFor: '',
      businessName: '',
      targetDate: '',
    });
    setIsSubmitted(false);
    setIsLoading(false);
    setSubmitError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Transform Your Business with AI
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Watch how we've helped businesses automate processes, reduce costs,
            and scale efficiently with custom AI solutions.
          </p>

          {/* Video Section */}
          <div className="relative mx-auto mb-12 max-w-4xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-2xl">
              <video
                className="h-full w-full object-cover"
                controls
                poster="/herocircle.webp"
                preload="metadata"
              >
                <source src="/hero-vid.mov" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl bg-white p-8 shadow-xl dark:bg-slate-800">
            {isSubmitted ? (
              // Success Message
              <div className="text-center">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-green-500/20">
                    <svg
                      className="h-8 w-8 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                  Thank You!
                </h2>
                <p className="mb-6 text-gray-600 dark:text-gray-300">
                  Your message has been sent successfully. We'll review your
                  project details and get back to you within 24 hours.
                </p>
                <div className="mb-6 rounded-lg border border-blue-400/20 bg-blue-500/10 p-4">
                  <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                    📧 Check your email
                  </p>
                  <p className="mt-1 text-xs text-blue-500 dark:text-blue-300">
                    We've sent you a confirmation email with next steps.
                  </p>
                </div>
                <Button
                  onClick={resetForm}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <>
                <div className="mb-8 text-center">
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    Ready to Get Started?
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Tell us about your project and we'll create a custom AI
                    solution for your business.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {submitError && (
                    <div className="rounded-lg border border-red-400/20 bg-red-500/10 p-3">
                      <div className="flex items-center space-x-2">
                        <svg
                          className="h-4 w-4 flex-shrink-0 text-red-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-red-600 dark:text-red-300">
                          {submitError}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Name *
                        </Label>
                        <Input
                          id="name"
                          placeholder="Your full name"
                          value={formData.name}
                          onChange={e =>
                            handleInputChange('name', e.target.value)
                          }
                          className={`${
                            errors.name
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@company.com"
                          value={formData.email}
                          onChange={e =>
                            handleInputChange('email', e.target.value)
                          }
                          className={`${
                            errors.email
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="businessName"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Business Name *
                        </Label>
                        <Input
                          id="businessName"
                          placeholder="Your business name"
                          value={formData.businessName}
                          onChange={e =>
                            handleInputChange('businessName', e.target.value)
                          }
                          className={`${
                            errors.businessName
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        />
                        {errors.businessName && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="whatYouWillUseAiFor"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          What will you use AI for? *
                        </Label>
                        <select
                          id="whatYouWillUseAiFor"
                          value={formData.whatYouWillUseAiFor}
                          onChange={e =>
                            handleInputChange(
                              'whatYouWillUseAiFor',
                              e.target.value
                            )
                          }
                          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.whatYouWillUseAiFor
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        >
                          <option value="">Select an option</option>
                          <option value="appointment-setting">
                            Appointment Setting
                          </option>
                          <option value="lead-acquisition-qualification">
                            Lead Acquisition/Qualification
                          </option>
                          <option value="voice-ai-calls">Voice AI Calls</option>
                          <option value="custom-saas-use-case">
                            Custom AI Use Case
                          </option>
                          <option value="other">Other</option>
                        </select>
                        {errors.whatYouWillUseAiFor && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.whatYouWillUseAiFor}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="phone"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          value={formData.phone}
                          onChange={e =>
                            handleInputChange('phone', e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="website"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Website
                        </Label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://yourcompany.com"
                          value={formData.website}
                          onChange={e =>
                            handleInputChange('website', e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="whereDidYouHearFromUs"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Where did you hear from us? *
                        </Label>
                        <select
                          id="whereDidYouHearFromUs"
                          value={formData.whereDidYouHearFromUs}
                          onChange={e =>
                            handleInputChange(
                              'whereDidYouHearFromUs',
                              e.target.value
                            )
                          }
                          className={`flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.whereDidYouHearFromUs
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        >
                          <option value="">Select an option</option>
                          <option value="instagram">Instagram</option>
                          <option value="x">X (Twitter)</option>
                          <option value="referral">Referral</option>
                          <option value="youtube">YouTube</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.whereDidYouHearFromUs && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.whereDidYouHearFromUs}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="targetDate"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Target Date *
                        </Label>
                        <Input
                          id="targetDate"
                          type="date"
                          value={formData.targetDate}
                          onChange={e =>
                            handleInputChange('targetDate', e.target.value)
                          }
                          className={`${
                            errors.targetDate
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : ''
                          }`}
                        />
                        {errors.targetDate && (
                          <p className="mt-1 text-sm text-red-500">
                            {errors.targetDate}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            id="phoneOptIn"
                            type="checkbox"
                            checked={formData.phoneOptIn}
                            onChange={e =>
                              handleInputChange('phoneOptIn', e.target.checked)
                            }
                            className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          />
                          <Label
                            htmlFor="phoneOptIn"
                            className="text-sm font-medium text-gray-700 dark:text-gray-300"
                          >
                            I consent to being contacted by phone
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Full-width fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="reason"
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                      >
                        Why are you reaching out? *
                      </Label>
                      <textarea
                        id="reason"
                        placeholder="Please specify in detail your project, goals, timeline, and any specific requirements you have..."
                        value={formData.reason}
                        onChange={e =>
                          handleInputChange('reason', e.target.value)
                        }
                        rows={4}
                        className={`flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.reason
                            ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20'
                            : ''
                        }`}
                      />
                      {errors.reason && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.reason}
                        </p>
                      )}
                    </div>

                    {formData.whatYouWillUseAiFor === 'other' && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="requestedService"
                          className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Please specify your use case
                        </Label>
                        <textarea
                          id="requestedService"
                          placeholder="Please describe your specific AI use case..."
                          value={formData.requestedService}
                          onChange={e =>
                            handleInputChange(
                              'requestedService',
                              e.target.value
                            )
                          }
                          rows={1}
                          className="flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-14 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-lg font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="mr-2 h-4 w-4 animate-spin"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                          />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Get Free Consultation'
                    )}
                  </Button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  We'll respond within 24 hours with a custom proposal
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
