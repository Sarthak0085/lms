import { ScrollArea } from '@repo/ui';
import React from 'react';

export const PageContainer = ({
    children,
    scrollable = false
}: {
    children: React.ReactNode;
    scrollable?: boolean;
}) => {
    return (
        <>
            {scrollable ? (
                <ScrollArea className="h-[calc(100dvh-52px)]">
                    <div className="h-full  p-4 md:px-8">{children}</div>
                </ScrollArea>
            ) : (
                <div className="h-full  p-4 md:px-8">{children}</div>
            )}
        </>
    );
}