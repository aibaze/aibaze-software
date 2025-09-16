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
  title = 'Follow Our Journey',
  subtitle = 'Stay connected and get the latest updates',
}: SocialsProps) {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: Icons.instagram,
      href: 'https://instagram.com/aibaze',
      color: 'from-pink-500 to-purple-600',
      hoverColor: 'hover:from-pink-600 hover:to-purple-700',
      description: 'Behind-the-scenes content',
    },
    {
      name: 'YouTube',

      icon: Icons.youtube,
      href: 'https://youtube.com/@aibaze',
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      description: 'Tutorials and demos',
    },
  ];

  return (
    <section className={`px-4 py-8 ${className}`}>
      <div className="mx-auto max-w-2xl text-center">
        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-2 text-xl font-bold text-foreground md:text-2xl">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>

        {/* Social Cards */}
        <div className="mx-auto grid max-w-lg grid-cols-1 gap-4 md:grid-cols-2">
          {socialLinks.map((social, index) => (
            <div
              key={social.name}
              className="group relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-xl border border-border/30 bg-gradient-to-br from-background to-muted/30 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-border hover:shadow-lg hover:shadow-black/5">
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} group-hover:opacity-3 opacity-0 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${social.color} ${social.hoverColor} mb-3 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md`}
                  >
                    <social.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Platform Name */}
                  <h3 className="mb-1 text-sm font-semibold text-foreground transition-colors group-hover:text-foreground/90">
                    {social.name}
                  </h3>

                  {/* Description */}
                  <p className="mb-3 text-xs text-muted-foreground">
                    {social.description}
                  </p>

                  {/* CTA Button */}
                  <Button
                    asChild
                    size="sm"
                    className={`w-full bg-gradient-to-r ${social.color} ${social.hoverColor} group-hover:scale-102 border-0 text-xs text-white transition-all duration-300 hover:shadow-md`}
                  >
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow us on ${social.name}`}
                      className="flex items-center justify-center gap-1"
                    >
                      <span>Follow</span>
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

                {/* Decorative Elements */}
                <div className="absolute right-2 top-2 h-1 w-1 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
