import { Icons } from '@/components/icons';
import { buttonVariants } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IoMenuSharp } from 'react-icons/io5';
import { useState } from 'react';
import { ContactModal } from '@/components/contact-modal';

interface DrawerDemoProps {
  onContactClick?: () => void;
}

export default function drawerDemo({ onContactClick }: DrawerDemoProps) {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    if (onContactClick) {
      onContactClick();
    } else {
      setIsContactModalOpen(true);
    }
  };

  return (
    <>
      <Drawer>
        <DrawerTrigger>
          <IoMenuSharp className="text-2xl" />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader className="px-6">
            <div className="">
              <Link
                href="/"
                title="brand-logo"
                className="relative mr-6 flex items-center space-x-2"
              >
                <Icons.logo className="h-[40px] w-auto" />
                <span className="text-xl font-bold">{siteConfig.name}</span>
              </Link>
            </div>
            <nav>
              <ul className="mt-7 space-y-4 text-left">
                {siteConfig.header
                  .filter(item => item.trigger !== 'Solutions')
                  .map((item, index) => (
                    <li key={index}>
                      {item.content ? (
                        <div className="space-y-2">
                          <span className="text-lg font-semibold">
                            {item.trigger}
                          </span>
                          <ul className="ml-4 space-y-2">
                            {item.content.items?.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.href || '#'}
                                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <button
                          onClick={
                            item.trigger === 'Contact'
                              ? handleContactClick
                              : undefined
                          }
                          className={cn(
                            'text-left text-lg font-semibold',
                            item.trigger === 'Contact'
                              ? 'cursor-pointer hover:text-primary'
                              : ''
                          )}
                        >
                          {item.trigger}
                        </button>
                      )}
                    </li>
                  ))}
              </ul>
            </nav>
          </DrawerHeader>
          <DrawerFooter>
            <button
              onClick={handleContactClick}
              className={cn(
                buttonVariants({ variant: 'default' }),
                'flex w-full gap-2 text-background'
              )}
            >
              <strong>Book Your Discovery Call</strong>
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      <ContactModal
        open={isContactModalOpen}
        onOpenChange={setIsContactModalOpen}
      />
    </>
  );
}
