import React from 'react';
import { Icons } from './icons';
import { Button } from './ui/button';

interface SocialsProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function Socials({
  className = '',
  title = 'Connect With Us',
  subtitle = 'Join our global community of innovators and industry leaders',
}: SocialsProps) {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Icons.instagram,
      href: 'https://instagram.com/aibaze',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      description: 'Exclusive insights and company culture',
    },
    {
      name: 'YouTube',
      icon: Icons.youtube,
      href: 'https://youtube.com/@aibaze',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      description: 'Expert tutorials and product showcases',
    },
  ];

  return (
    <section className={`px-4 py-6 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        {/* Header */}
        <div className="mb-4">
          <h2 className="mb-2 text-lg font-semibold text-foreground md:text-xl">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Company Locations */}
        <div className="mb-8 flex flex-col items-center justify-center gap-2 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 px-6 py-4">
          <div className="flex items-center gap-4">
            <span className="text-2xl">🇺🇸</span>
            <span className="text-2xl">🇦🇪</span>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-primary">
              We are based in UAE and USA
            </div>
            <div className="text-xs text-muted-foreground">
              Strategic Global Operations
            </div>
          </div>
        </div>

        {/* Social Cards */}
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-3 md:grid-cols-2">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/20 p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br ${social.color} ${social.hoverColor} mb-2 transition-all duration-300 group-hover:scale-105`}
                  >
                    <social.icon className="h-4 w-4 text-white" />
                  </div>

                  {/* Platform Name */}
                  <h3 className="mb-1 text-sm font-medium text-foreground">
                    {social.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-2 text-xs text-muted-foreground">
                    {social.description}
                  </p>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="sm"
                    className={`w-full bg-gradient-to-r ${social.color} ${social.hoverColor} border-0 text-xs text-white transition-all duration-300 hover:shadow-sm`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Connect with us on ${social.name}`}
                      className="flex items-center justify-center gap-1"
                    >
                      <span>Connect</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
