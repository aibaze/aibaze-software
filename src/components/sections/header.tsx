'use client';

import Drawer from '@/components/drawer';
import { Icons } from '@/components/icons';
import Menu from '@/components/menu';
import { buttonVariants } from '@/components/ui/button';
import { ContactModal } from '@/components/contact-modal';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function Header() {
  const [addBorder, setAddBorder] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setAddBorder(true);
      } else {
        setAddBorder(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={
        'relative sticky top-0 z-50 bg-background/60 py-2 backdrop-blur'
      }
    >
      <div className="container flex items-center justify-between">
        <a
          href="/"
          title="brand-logo"
          className="relative mr-6 flex items-center space-x-2"
        >
          <Icons.logo className="h-[30px] w-[30px]" />
          <span className="text-xl font-bold">{siteConfig.name}</span>
        </a>

        <div className="hidden lg:block">
          <div className="flex items-center">
            <nav className="mr-5">
              <Menu onContactClick={() => setIsContactModalOpen(true)} />
            </nav>
            <div className="flex gap-2">
              <button
                onClick={() => setIsContactModalOpen(true)}
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'flex w-full gap-2 text-background sm:w-auto'
                )}
              >
                <strong>Book Your Discovery Call</strong>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2 block cursor-pointer lg:hidden">
          <Drawer onContactClick={() => setIsContactModalOpen(true)} />
        </div>
      </div>
      <hr
        className={cn(
          'absolute bottom-0 w-full transition-opacity duration-300 ease-in-out',
          addBorder ? 'opacity-100' : 'opacity-0'
        )}
      />
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </header>
  );
}
