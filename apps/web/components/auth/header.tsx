import { Poppins } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";
import React from "react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

export const Header = ({ label }: { label: string }) => {
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <h1 className={cn("text-2xl font-semibold flex items-center gap-2", font.className)}>
                🔐<span className="text-3xl logo-style">E-Learning</span>
            </h1>
            <p className="text-muted-foreground text-sm">{label}</p>
        </div>
    );
};
