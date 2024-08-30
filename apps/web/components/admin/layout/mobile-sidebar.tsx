'use client';

import { Sheet, SheetContent, SheetTrigger } from '@repo/ui';
import { MenuIcon } from '@repo/ui/icon';
import { useState } from 'react';
import { DashboardNav } from '@/components/admin/dashboard/dashboard-nav';
import { navItems } from '@/constants/data';

export const MobileSidebar = () => {
    const [open, setOpen] = useState(false);
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <MenuIcon />
            </SheetTrigger>
            <SheetContent side="left" className="!px-0">
                <div className="space-y-4 py-4">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Overview
                        </h2>
                        <div className="space-y-1">
                            <DashboardNav
                                items={navItems}
                                isMobileNav={true}
                                setOpen={setOpen}
                            />
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}