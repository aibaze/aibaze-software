'use client';

import Link from 'next/link';
import * as React from 'react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { siteConfig } from '@/lib/config';
import { cn } from '@/lib/utils';

interface NavigationMenuDemoProps {
  onContactClick?: () => void;
}

export default function NavigationMenuDemo({
  onContactClick,
}: NavigationMenuDemoProps) {
  return (
    <NavigationMenu className="w-[200px]">
      <NavigationMenuList>
        {siteConfig.header.map((item, index) => (
          <NavigationMenuItem key={index}>
            {item.content ? (
              <>
                <NavigationMenuTrigger
                  hasContent={!!item.content?.items?.length}
                  href={item.href}
                >
                  {item.trigger}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className={`flex w-[400px] flex-wrap gap-1 p-6`}>
                    {item.content?.items?.map((subItem, subIndex) => (
                      <ListItem
                        key={subIndex}
                        href={subItem.href}
                        title={subItem.title}
                        className="flex flex-shrink-0 flex-grow-0 basis-full !list-none list-none items-center before:content-none hover:bg-primary/10"
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </div>
                </NavigationMenuContent>
              </>
            ) : item.trigger === 'Contact' && onContactClick ? (
              <button
                onClick={onContactClick}
                className={navigationMenuTriggerStyle()}
              >
                {item.trigger}
              </button>
            ) : (
              <Link href={item.href || ''} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.trigger}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex flex-col gap-2">
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = 'ListItem';
