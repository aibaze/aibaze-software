'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { aibazeApi as api } from '@/api';

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    reason: '',
    whereDidYouHearFromUs: '',
    internalCompany: 'aibaze',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    reason: '',
    company: '',
    whereDidYouHearFromUs: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      reason: '',
      company: '',
      whereDidYouHearFromUs: '',
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

    if (!formData.company.trim()) {
      newErrors.company = 'Company information is required';
    } else if (formData.company.trim().length < 2) {
      newErrors.company = 'Please provide valid company information';
    }

    if (!formData.whereDidYouHearFromUs.trim()) {
      newErrors.whereDidYouHearFromUs = 'Please select how you heard about us';
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
        '/users/feedback',
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

  const handleInputChange = (field: string, value: string) => {
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
      company: '',
      reason: '',
      whereDidYouHearFromUs: '',
      internalCompany: 'aibaze',
    });
    setErrors({
      name: '',
      email: '',
      reason: '',
      company: '',
      whereDidYouHearFromUs: '',
    });
    setIsSubmitted(false);
    setIsLoading(false);
    setSubmitError('');
  };

  const handleClose = () => {
    if (isSubmitted) {
      resetForm();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl sm:max-w-[425px]">
        {isSubmitted ? (
          // Success Message
          <>
            <DialogHeader>
              <DialogTitle className="text-center text-white">
                Thank You!
              </DialogTitle>
              <DialogDescription className="text-center text-white/80">
                Your message has been sent successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-6 py-6">
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
              <div className="space-y-2 text-center">
                <p className="text-lg font-medium text-white">
                  We&apos;ve received your message
                </p>
                <p className="text-sm text-white/70">
                  Please check your email for a confirmation message. Our team
                  will review your project details and get back to you within 24
                  hours.
                </p>
                <div className="mt-4 rounded-lg border border-blue-400/20 bg-blue-500/10 p-3">
                  <p className="text-sm font-medium text-blue-300">
                    📧 Check your email
                  </p>
                  <p className="mt-1 text-xs text-blue-200/80">
                    We&apos;ve sent you a confirmation email with next steps.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-center">
              <Button
                onClick={resetForm}
                className="border-white/30 bg-white text-black transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/90"
              >
                Send Another Message
              </Button>
            </DialogFooter>
          </>
        ) : (
          // Original Form
          <>
            <DialogHeader>
              <DialogTitle className="text-white">Get in Touch</DialogTitle>
              <DialogDescription className="text-white/80">
                Tell us about your project and we&apos;ll get back to you as
                soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    <p className="text-sm text-red-300">{submitError}</p>
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Name *
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={e => handleInputChange('name', e.target.value)}
                  required
                  className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                    errors.name
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'hover:border-white/30'
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={formData.email}
                  onChange={e => handleInputChange('email', e.target.value)}
                  required
                  className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                    errors.email
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'hover:border-white/30'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="reason" className="text-white">
                  Why are you reaching out? *
                </Label>
                <textarea
                  id="reason"
                  placeholder="Please specify in detail your project, goals, timeline, and any specific requirements you have..."
                  value={formData.reason}
                  onChange={e => handleInputChange('reason', e.target.value)}
                  required
                  rows={4}
                  className={`flex w-full resize-none rounded-md border bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.reason
                      ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20'
                      : 'border-white/20 hover:border-white/30 focus-visible:border-white/40 focus-visible:ring-white/40'
                  }`}
                />
                {errors.reason && (
                  <p className="mt-1 text-sm text-red-400">{errors.reason}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">
                  Company & Professional Information *
                </Label>
                <Input
                  id="company"
                  placeholder="Company LinkedIn profile or website"
                  value={formData.company}
                  onChange={e => handleInputChange('company', e.target.value)}
                  required
                  className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                    errors.company
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'hover:border-white/30'
                  }`}
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-400">{errors.company}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="whereDidYouHearFromUs" className="text-white">
                  Where did you hear from us? *
                </Label>
                <select
                  id="whereDidYouHearFromUs"
                  value={formData.whereDidYouHearFromUs}
                  onChange={e =>
                    handleInputChange('whereDidYouHearFromUs', e.target.value)
                  }
                  required
                  className={`flex w-full rounded-md border bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.whereDidYouHearFromUs
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                      : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:ring-white/40'
                  }`}
                >
                  <option value="" className="bg-gray-800 text-white">
                    Select an option
                  </option>
                  <option value="instagram" className="bg-gray-800 text-white">
                    Instagram
                  </option>
                  <option value="x" className="bg-gray-800 text-white">
                    X (Twitter)
                  </option>
                  <option value="referral" className="bg-gray-800 text-white">
                    Referral
                  </option>
                  <option value="youtube" className="bg-gray-800 text-white">
                    YouTube
                  </option>
                  <option value="other" className="bg-gray-800 text-white">
                    Other
                  </option>
                </select>
                {errors.whereDidYouHearFromUs && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.whereDidYouHearFromUs}
                  </p>
                )}
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                  className="border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20 disabled:opacity-50"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center space-x-2 border-white/30 bg-white text-black transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/90 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="h-4 w-4 animate-spin"
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
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Get in Touch</span>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
