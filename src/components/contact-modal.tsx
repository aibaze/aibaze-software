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

  const handleClose = () => {
    if (isSubmitted) {
      resetForm();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border border-white/20 bg-white/5 shadow-2xl backdrop-blur-2xl sm:max-w-[1200px]">
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
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              {/* Left Column - Copy */}
              <div className="flex flex-col justify-center space-y-6 lg:col-span-1">
                <div className="space-y-4">
                  <DialogTitle className="text-2xl font-bold text-white">
                    Get in Touch
                  </DialogTitle>
                  <DialogDescription className="font-semibold text-white/80">
                    Tell us about your project and we&apos;ll assess your case
                    and get back to you within 1 business day.
                  </DialogDescription>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  What you are getting:
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20">
                      <svg
                        className="h-4 w-4 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        {' '}
                        We&apos;ll assess your case and contact you within 1
                        business day.
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <span className="text-white/90">
                      Strategic consultation & project assessment
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20">
                      <svg
                        className="h-4 w-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <span className="text-white/90">
                      Fast development & deployment
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20">
                      <svg
                        className="h-4 w-4 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <span className="text-white/90">
                      Ongoing support & optimization
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Columns - Form */}
              <div className="lg:col-span-2">
                <DialogHeader className="mb-2"></DialogHeader>
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

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="font-semibold text-white"
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
                          className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                            errors.name
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'hover:border-white/30'
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="font-semibold text-white"
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
                          className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                            errors.email
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'hover:border-white/30'
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="businessName"
                          className="font-semibold text-white"
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
                          className={`border-white/20 bg-white/10 text-white transition-all duration-200 placeholder:text-white/60 focus:border-white/40 ${
                            errors.businessName
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'hover:border-white/30'
                          }`}
                        />
                        {errors.businessName && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.businessName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="whatYouWillUseAiFor"
                          className="font-semibold text-white"
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
                          className={`flex w-full rounded-md border bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.whatYouWillUseAiFor
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:ring-white/40'
                          }`}
                        >
                          <option value="" className="bg-gray-800 text-white">
                            Select an option
                          </option>
                          <option
                            value="appointment-setting"
                            className="bg-gray-800 text-white"
                          >
                            Appointment Setting
                          </option>
                          <option
                            value="lead-acquisition-qualification"
                            className="bg-gray-800 text-white"
                          >
                            Lead Acquisition/Qualification
                          </option>
                          <option
                            value="voice-ai-calls"
                            className="bg-gray-800 text-white"
                          >
                            Voice AI Calls
                          </option>
                          <option
                            value="custom-saas-use-case"
                            className="bg-gray-800 text-white"
                          >
                            Custom SaaS Use Case
                          </option>
                          <option
                            value="other"
                            className="bg-gray-800 text-white"
                          >
                            Other
                          </option>
                        </select>
                        {errors.whatYouWillUseAiFor && (
                          <p className="mt-1 text-sm text-red-400">
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
                          className="font-semibold text-white"
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
                          className="border-white/20 bg-white/10 text-white placeholder:text-white/60 hover:border-white/30 focus:border-white/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="website"
                          className="font-semibold text-white"
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
                          className="border-white/20 bg-white/10 text-white placeholder:text-white/60 hover:border-white/30 focus:border-white/40"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="whereDidYouHearFromUs"
                          className="font-semibold text-white"
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
                          className={`flex w-full rounded-md border bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                            errors.whereDidYouHearFromUs
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'border-white/20 hover:border-white/30 focus:border-white/40 focus:ring-white/40'
                          }`}
                        >
                          <option value="" className="bg-gray-800 text-white">
                            Select an option
                          </option>
                          <option
                            value="instagram"
                            className="bg-gray-800 text-white"
                          >
                            Instagram
                          </option>
                          <option value="x" className="bg-gray-800 text-white">
                            X (Twitter)
                          </option>
                          <option
                            value="referral"
                            className="bg-gray-800 text-white"
                          >
                            Referral
                          </option>
                          <option
                            value="youtube"
                            className="bg-gray-800 text-white"
                          >
                            YouTube
                          </option>
                          <option
                            value="other"
                            className="bg-gray-800 text-white"
                          >
                            Other
                          </option>
                        </select>
                        {errors.whereDidYouHearFromUs && (
                          <p className="mt-1 text-sm text-red-400">
                            {errors.whereDidYouHearFromUs}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="targetDate"
                          className="font-semibold text-white"
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
                          className={`border-white/20 bg-white/10 text-white transition-all duration-200 focus:border-white/40 ${
                            errors.targetDate
                              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
                              : 'hover:border-white/30'
                          }`}
                        />
                        {errors.targetDate && (
                          <p className="mt-1 text-sm text-red-400">
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
                            className="h-4 w-4 rounded border-white/20 bg-white/10 text-white focus:ring-white/40 focus:ring-offset-0"
                          />
                          <Label
                            htmlFor="phoneOptIn"
                            className="font-semibold text-white"
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
                        className="font-semibold text-white"
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
                        className={`flex w-full resize-none rounded-md border bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                          errors.reason
                            ? 'border-red-400 focus-visible:border-red-400 focus-visible:ring-red-400/20'
                            : 'border-white/20 hover:border-white/30 focus-visible:border-white/40 focus-visible:ring-white/40'
                        }`}
                      />
                      {errors.reason && (
                        <p className="mt-1 text-sm text-red-400">
                          {errors.reason}
                        </p>
                      )}
                    </div>

                    {formData.whatYouWillUseAiFor === 'other' && (
                      <div className="space-y-2">
                        <Label
                          htmlFor="requestedService"
                          className="font-semibold text-white"
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
                          className="flex w-full resize-none rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white transition-all duration-200 placeholder:text-white/60 hover:border-white/30 focus-visible:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50"
                        />
                      </div>
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
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
