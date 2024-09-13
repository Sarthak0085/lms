"use client";

import { logOut } from "@/actions/auth/logout";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@repo/ui";
import {
    AiOutlineLogout,
    FaUser,
    RiLockPasswordLine,
    SiCoursera,
} from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
    user?: any;
    active: number;
    setActive: React.Dispatch<React.SetStateAction<number>>;
};

export const Sidebar: React.FC<Props> = ({
    active,
    setActive,
    user,
}) => {
    const logoutHandler = async () => {
        await logOut();
    };
    return (
        <div className="w-full">
            <div
                className={cn(
                    "w-full flex items-center px-3 py-4 cursor-pointer",
                    active === 1 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent",
                )}
                onClick={() => setActive(1)}
            >
                <Avatar
                    className={cn(
                        "w-[20px] h-[20px] 825:w-[30px] 825:h-[30px] cursor-pointer rounded-full",
                        active === 1
                            ? " border-[1px] dark:!border-[#37a39a] !border-blue-500 bg-white"
                            : "bg-transparent",
                    )}
                >
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser />
                    </AvatarFallback>
                </Avatar>
                <h3
                    className={cn(
                        "pl-2 hidden 825:block font-Poppins dark:text-white text-black",
                        active === 1
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                >
                    My Account
                </h3>
            </div>
            <div
                className={cn(
                    "w-full flex items-center px-3 py-4 cursor-pointer",
                    active === 2 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent",
                )}
                onClick={() => setActive(2)}
            >
                <RiLockPasswordLine
                    size={20}
                    className={cn(
                        "dark:text-white text-black",
                        active === 2
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                />
                <h3
                    className={cn(
                        "pl-2 hidden 825:block font-Poppins dark:text-white text-black",
                        active === 2
                            ? " dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                >
                    Change Password
                </h3>
            </div>
            <div
                className={cn(
                    "w-full flex items-center px-3 py-4 cursor-pointer",
                    active === 3 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent",
                )}
                onClick={() => setActive(3)}
            >
                <SiCoursera
                    size={20}
                    className={cn(
                        "dark:text-white text-black",
                        active === 3
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                />
                <h3
                    className={cn(
                        "pl-2 hidden 825:block font-Poppins dark:text-white text-black",
                        active === 3
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                >
                    Enroll Courses
                </h3>
            </div>
            {user?.role === "ADMIN" && (
                <Link
                    className={cn(
                        "w-full flex items-center px-3 py-4 cursor-pointer",
                        active === 5 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent",
                    )}
                    href="/admin"
                >
                    <SiCoursera
                        size={20}
                        className={cn(
                            "dark:text-white text-black",
                            active === 5
                                ? "dark:!text-[#37a39a] !text-blue-500"
                                : "bg-transparent",
                        )}
                    />
                    <h3
                        className={cn(
                            "pl-2 hidden 825:block font-Poppins dark:text-white text-black",
                            active === 5
                                ? "dark:!text-[#37a39a] !text-blue-500"
                                : "bg-transparent",
                        )}
                    >
                        Admin
                    </h3>
                </Link>
            )}
            <div
                className={cn(
                    "w-full flex items-center px-3 py-4 cursor-pointer",
                    active === 4 ? "dark:bg-slate-800 bg-gray-200" : "bg-transparent",
                )}
                onClick={logoutHandler}
            >
                <AiOutlineLogout
                    size={20}
                    className={cn(
                        "dark:text-white text-black",
                        active === 4
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                />
                <h3
                    className={cn(
                        "pl-2 hidden 825:block font-Poppins dark:text-white text-black",
                        active === 4
                            ? "dark:!text-[#37a39a] !text-blue-500"
                            : "bg-transparent",
                    )}
                >
                    Log Out
                </h3>
            </div>
        </div>
    );
};
