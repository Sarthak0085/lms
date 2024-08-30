"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { NavItems } from "@/components/layout/nav-items";
import { FaUser, HiOutlineMenuAlt3, HiOutlineUserCircle } from "@repo/ui/icon";
import { LoginButton } from "@/components/auth/login-button";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { Button } from "@repo/ui/components/ui/button";
import { auth } from "@/auth";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { User } from "next-auth";


export const Header = () => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(0);
    const [active, setActive] = useState(false);
    const [openSidebar, setOpenSidebar] = useState(false);

    const user = useCurrentUser();

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 85) {
                setActive(true);
            } else {
                setActive(false)
            }
        })
    }

    const handleClose = (e: any) => {
        if (e.target.id === "screen") {
            {
                setOpenSidebar(false);
            }
        }
    }

    return (
        <div className="w-full relative">
            <div
                className={`${active
                    ? "dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 backdrop-blur-md"
                    : "w-full border-b dark:border-[#ffff1c]/50 h-[80px] dark:shadow-md"
                    }`}
            >
                <div className="w-[95%] 825:w-[92%] m-auto py-2 h-full">
                    <div className="w-full h-[80px] flex items-center justify-between p-3">
                        <div>
                            <Link href={"/"}
                                className={`text-[25px] font-Poppins font-[500] logo-style`}
                            >
                                E-Learning
                            </Link>
                        </div>
                        <div className="flex items-center">
                            <NavItems
                                activeItem={activeItem}
                                isMobile={false}
                            />
                            <ThemeSwitcher />
                            {/* only for mobile  */}
                            <div className="825:hidden">
                                <Button
                                    variant={"icon"}
                                    onClick={() => setOpenSidebar(true)}
                                >
                                    <HiOutlineMenuAlt3
                                        size={25}
                                        className="cursor-pointer dark:text-white text-black"
                                    />
                                </Button>
                            </div>
                            {
                                user ? (

                                    <Link href="/profile">
                                        <Avatar
                                            className={cn(
                                                "w-[30px] h-[30px] ml-6 cursor-pointer rounded-full")}
                                        >
                                            <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                                            <AvatarFallback className="bg-sky-500">
                                                <FaUser color="white" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </Link>
                                ) : (
                                    <Link href={"/auth/login"}>
                                        <HiOutlineUserCircle
                                            size={25}
                                            className="hidden 825:block ml-6 cursor-pointer dark:text-white text-black"
                                        />
                                        <span className="sr-only">Login</span>
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
                {/* mobile sidebar  */}
                {
                    openSidebar && (
                        <div
                            className="fixed !left-0 !top-0 w-full h-screen z-[9999] dark:bg-[unset] bg-[#00000024]"
                            id="screen"
                            onClick={handleClose}
                        >
                            <div className="w-[70%] fixed z-[99999] text-center h-screen !right-0 !top-0 bg-white dark:bg-slate-900 dark:bg-opacity-90">
                                <NavItems activeItem={activeItem} isMobile={true} />
                                {
                                    user ? (
                                        <Link href="/profile">
                                            <Avatar
                                                className={cn(
                                                    "w-[30px] h-[30px] ml-6 cursor-pointer rounded-full")}
                                            >
                                                <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                                                <AvatarFallback className="bg-sky-500">
                                                    <FaUser color="white" />
                                                </AvatarFallback>
                                            </Avatar>
                                        </Link>
                                    ) : (
                                        <Link href={"/auth/login"}>
                                            <HiOutlineUserCircle
                                                size={25}
                                                className="ml-6 cursor-pointer dark:text-white text-black"
                                            />
                                            <span className="sr-only">Login</span>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

