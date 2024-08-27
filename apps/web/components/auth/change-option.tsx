"use client";

import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface changeOptionProps {
    label: string;
    href: string;
}

export const ChangeOption = ({ label, href }: changeOptionProps) => {
    return (
        <Button variant={"link"} className="font-normal w-full" size={"sm"} asChild>
            <Link href={href}>{label}</Link>
        </Button>
    );
};
