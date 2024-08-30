"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@repo/ui/components/ui/dropdown-menu"
import { Button } from "@repo/ui/components/ui/button"
import { LaptopIcon, MoonIcon, SunIcon } from "@repo/ui/icon"

export const ThemeSwitcher = () => {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                    <SunIcon className="rotate-0 size-5 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <MoonIcon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    <Button variant={"ghostStart"} className="!w-full !h-auto">
                        <SunIcon className="mr-2 size-5" />
                        <span>Light</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    <Button variant={"ghostStart"} className="!w-full !h-auto">
                        <MoonIcon className="mr-2 size-5" />
                        <span>Dark</span>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    <Button variant={"ghostStart"} className="!w-full !h-auto">
                        <LaptopIcon className="mr-2 size-5" />
                        <span>System</span>
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
