"use client";

import React from "react";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

interface changeOptionProps {
    label: string;
    href: string;
}

export const ChangeOption = ({
    label,
    href,
}: changeOptionProps) => {
    return (
        <Button
            variant={"link"}
            asChild
            className="font-normal w-full"
            size={"sm"}
        >
            <Link href={href}>
                {label}
            </Link>
        </Button>
    );
};
