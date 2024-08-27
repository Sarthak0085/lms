"use client";

import React from "react";
import { Button } from "@repo/ui/components/ui/button";

interface changeOptionProps {
    label: string;
    href: string;
    setRoute: (href: string) => void;
}

export const ChangeOption = ({
    label,
    href,
    setRoute
}: changeOptionProps) => {
    return (
        <Button variant={"link"} className="font-normal w-full" size={"sm"} onClick={() => setRoute(href)}>
            {label}
        </Button>
    );
};
