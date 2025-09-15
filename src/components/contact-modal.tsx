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

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      reason: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please tell us about your project";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    try {
      // Here you can add your form submission logic
      console.log("Form submitted:", formData);
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
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error if needed
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", company: "", reason: "", whereDidYouHearFromUs: "" });
    setErrors({ name: "", email: "", reason: "" });
    setIsSubmitted(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
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
                  Our team will review your project details and get back to you within 24 hours.
                </p>
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
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">Name *</Label>
            <Input
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              required
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 ${
                errors.name ? "border-red-400 focus:border-red-400" : ""
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
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white/40 ${
                errors.email ? "border-red-400 focus:border-red-400" : ""
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
              className={`flex w-full rounded-md border px-3 py-2 text-sm text-white placeholder:text-white/60 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none bg-white/10 ${
                errors.reason 
                  ? "border-red-400 focus-visible:ring-red-400 focus-visible:border-red-400" 
                  : "border-white/20 focus-visible:ring-white/40 focus-visible:border-white/40"
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
              className="flex w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50"
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
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40"
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-white border-white/30 text-black hover:bg-white/90 hover:border-white/50 transition-all duration-300 hover:scale-105"
                >
                  Get in Touch
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
