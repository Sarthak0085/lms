'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { NavItem } from '@/types';
import { Dispatch, SetStateAction } from 'react';
import { cn } from '@repo/ui/lib/utils';
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/ui';

interface DashboardNavProps {
    items: NavItem[];
    setOpen?: Dispatch<SetStateAction<boolean>>;
    isMobileNav?: boolean;
    isMinimized?: boolean;
}

export const DashboardNav = ({
    items,
    setOpen,
    isMinimized = false,
    isMobileNav = false
}: DashboardNavProps) => {
    const path = usePathname();
    const router = useRouter();

    if (!items?.length) {
        return null;
    }

    // console.log('isActive', isMobileNav, isMinimized);

    return (
        <nav className="grid items-start gap-2">
            <TooltipProvider>
                {items.map((item, index) => {
                    // const Icon = Icons[item.icon || 'arrowRight'];
                    return (
                        item.href && (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant={path === item.href ? "primary" : "ghost"}
                                        // href={item.disabled ? '/' : item.href}
                                        className={cn(
                                            'flex !items-center !justify-start gap-2 overflow-hidden rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                                            path === item.href ? 'bg-accent' : 'transparent',
                                            item.disabled && 'cursor-not-allowed opacity-80'
                                        )}
                                        onClick={() => {
                                            if (setOpen) setOpen(false);
                                            router.push(item?.href!)
                                        }}
                                    >
                                        <item.icon className={`size-5 flex-none`} />

                                        {isMobileNav || (!isMinimized && !isMobileNav) ? (
                                            <span className="mr-2 truncate">{item.title}</span>
                                        ) : (
                                            ''
                                        )}
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent
                                    align="center"
                                    side="right"
                                    sideOffset={8}
                                    className={!isMinimized ? 'hidden' : 'inline-block'}
                                >
                                    {item.title}
                                </TooltipContent>
                            </Tooltip>
                        )
                    );
                })}
            </TooltipProvider>
        </nav>
    );
}