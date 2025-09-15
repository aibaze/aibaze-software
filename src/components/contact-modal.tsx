"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { aibazeApi as api } from '@/api';


interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ContactModal({ open, onOpenChange }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    reason: "",
    whereDidYouHearFromUs: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    reason: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      reason: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please tell us about your project";
    } else if (formData.reason.trim().length < 10) {
      newErrors.reason = "Please provide more details about your project (at least 10 characters)";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await api.post('/users/feedback', {
        ...formData, 
        description: formData.reason,
        whereDidYouHearFromUs: formData.whereDidYouHearFromUs
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Show success message
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      // Handle different types of errors
      if (error.response?.status === 429) {
        setSubmitError("Too many requests. Please try again in a few minutes.");
      } else if (error.response?.status >= 500) {
        setSubmitError("Server error. Please try again later or contact us directly.");
      } else if (error.response?.status === 400) {
        setSubmitError("Invalid data. Please check your information and try again.");
      } else if (error.code === 'NETWORK_ERROR' || !navigator.onLine) {
        setSubmitError("Network error. Please check your connection and try again.");
      } else {
        setSubmitError("Something went wrong. Please try again or contact us directly.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
    // Clear submit error when user makes changes
    if (submitError) {
      setSubmitError("");
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", reason: "", whereDidYouHearFromUs: "" });
    setErrors({ name: "", email: "", reason: "" });
    setIsSubmitted(false);
    setIsLoading(false);
    setSubmitError("");
  };

  const handleClose = () => {
    if (isSubmitted) {
      resetForm();
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        {isSubmitted ? (
          // Success Message
          <>
            <DialogHeader>
              <DialogTitle className="text-white text-center">Thank You!</DialogTitle>
              <DialogDescription className="text-white/80 text-center">
                Your message has been sent successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center space-y-6 py-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center animate-pulse">
                <svg 
                  className="w-8 h-8 text-green-400" 
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
              <div className="text-center space-y-2">
                <p className="text-white text-lg font-medium">We&apos;ve received your message</p>
                <p className="text-white/70 text-sm">
                  Please check your email for a confirmation message. Our team will review your project details and get back to you within 24 hours.
                </p>
                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-400/20 rounded-lg">
                  <p className="text-blue-300 text-sm font-medium">📧 Check your email</p>
                  <p className="text-blue-200/80 text-xs mt-1">
                    We&apos;ve sent you a confirmation email with next steps.
                  </p>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-center">
              <Button 
                onClick={resetForm}
                className="bg-white border-white/30 text-black hover:bg-white/90 hover:border-white/50 transition-all duration-300 hover:scale-105"
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
                Tell us about your project and we&apos;ll get back to you as soon as possible.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              {submitError && (
                <div className="p-3 bg-red-500/10 border border-red-400/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-300 text-sm">{submitError}</p>
                  </div>
                </div>
              )}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-200 ${
                errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "hover:border-white/30"
              }`}
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@company.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 transition-all duration-200 ${
                errors.email ? "border-red-400 focus:border-red-400 focus:ring-red-400/20" : "hover:border-white/30"
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          
        
          
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-white">Why are you reaching out? *</Label>
            <textarea
              id="reason"
              placeholder="Please specify in detail your project, goals, timeline, and any specific requirements you have..."
              value={formData.reason}
              onChange={(e) => handleInputChange("reason", e.target.value)}
              required
              rows={4}
              className={`flex w-full rounded-md border px-3 py-2 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none bg-white/10 transition-all duration-200 ${
                errors.reason 
                  ? "border-red-400 focus-visible:ring-red-400/20 focus-visible:border-red-400" 
                  : "border-white/20 focus-visible:ring-white/40 focus-visible:border-white/40 hover:border-white/30"
              }`}
            />
            {errors.reason && (
              <p className="text-red-400 text-sm mt-1">{errors.reason}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">Company & Professional Information</Label>
            <Input
              id="company"
              placeholder="Company LinkedIn profile or website"
              value={formData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="whereDidYouHearFromUs" className="text-white">Where did you hear from us?</Label>
            <select
              id="whereDidYouHearFromUs"
              value={formData.whereDidYouHearFromUs}
              onChange={(e) => handleInputChange("whereDidYouHearFromUs", e.target.value)}
              className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-white/30"
            >
              <option value="" className="bg-gray-800 text-white">Select an option</option>
              <option value="instagram" className="bg-gray-800 text-white">Instagram</option>
              <option value="x" className="bg-gray-800 text-white">X (Twitter)</option>
              <option value="referral" className="bg-gray-800 text-white">Referral</option>
              <option value="youtube" className="bg-gray-800 text-white">YouTube</option>
              <option value="other" className="bg-gray-800 text-white">Other</option>
            </select>
          </div>
          
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40 disabled:opacity-50"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="bg-white border-white/30 text-black hover:bg-white/90 hover:border-white/50 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
