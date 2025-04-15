"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEmailSubmit: (email: string) => void;
}

export function EmailModal({ isOpen, onClose, onEmailSubmit }: EmailModalProps) {
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Load email from localStorage when component mounts
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      localStorage.setItem("userEmail", email);
      onEmailSubmit(email);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your email to start the call</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <Button type="submit" disabled={!email} className="w-full">
            Start Call
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 