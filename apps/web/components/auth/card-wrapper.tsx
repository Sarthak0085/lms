"use client";

import { ReactNode } from "react";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { ChangeOption } from "@/components/auth/change-option";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@repo/ui";

interface CardWrapperProps {
    children: ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
}

export const CardWrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial,
}: CardWrapperProps) => {
    return (
        <Card className="w-[400px]">
            <CardHeader>
                <Header label={headerLabel} />
            </CardHeader>
            <CardContent>
                <div>{children}</div>
            </CardContent>
            {showSocial && (
                <>
                    <div className="flex items-center mb-5 px-3">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-2 text-gray-600 dark:text-gray-100 text-sm">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>
                    <CardFooter>
                        <Social />
                    </CardFooter>
                </>
            )}
            <CardFooter>
                <ChangeOption label={backButtonLabel} href={backButtonHref} />
            </CardFooter>
        </Card>
    );
};
