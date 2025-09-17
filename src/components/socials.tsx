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
    <section className={`px-4 py-8 ${className}`}>
      <div className="mx-auto max-w-6xl text-center">
        {/* Header */}
        <div className="mb-8">
          <h2 className="mb-3 text-xl font-semibold text-foreground md:text-2xl">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Company Locations and Social Cards Container */}
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-center md:gap-12">
          {/* Company Locations */}
          <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 px-8 py-6 md:w-auto md:min-w-[280px]">
            <div className="flex items-center gap-6">
              <span className="text-3xl">🇺🇸</span>
              <span className="text-3xl">🇦🇪</span>
            </div>
            <div className="text-center">
              <div className="text-base font-semibold text-primary md:text-lg">
                We are based in UAE and USA
              </div>
              <div className="text-sm text-muted-foreground">
                Strategic Global Operations
              </div>
            </div>
          </div>

          {/* Social Cards */}
          <div className="grid grid-cols-1 gap-4 md:w-auto md:grid-cols-2">
            {socialLinks.map((social, index) => (
              <div
                key={social.name}
                className="group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden rounded-lg border border-border/20 bg-gradient-to-br from-background to-muted/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-md md:min-w-[200px]">
                  {/* Background Gradient */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br ${social.color} ${social.hoverColor} mb-3 transition-all duration-300 group-hover:scale-105`}
                    >
                      <social.icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Platform Name */}
                    <h3 className="mb-2 text-base font-medium text-foreground">
                      {social.name}
                    </h3>

                    {/* Description */}
                    <p className="mb-3 text-sm text-muted-foreground">
                      {social.description}
                    </p>

                    {/* CTA Button */}
                    <Button
                      asChild
                      size="sm"
                      className={`w-full bg-gradient-to-r ${social.color} ${social.hoverColor} border-0 text-sm text-white transition-all duration-300 hover:shadow-sm`}
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
                          width="14"
                          height="14"
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
      </div>
    </section>
  );
}
