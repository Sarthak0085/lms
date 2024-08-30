"use client";

import Link from "next/link";
import React from "react";

export const navItemsData = [
    {
        name: "Home",
        url: "/",
    },
    {
        name: "Courses",
        url: "/courses",
    },
    {
        name: "About",
        url: "/about",
    },
    {
        name: "Policy",
        url: "/policy",
    },
    {
        name: "Faq",
        url: "/faq",
    },
];

type Props = {
    activeItem: number;
    isMobile: boolean;
};

export const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="hidden 825:flex">
                {navItemsData &&
                    navItemsData.map((item, index) => (
                        <Link href={item.url} key={index} passHref>
                            <span
                                className={`${activeItem === index
                                    ? "dark:text-[#37a39a] text-blue-500"
                                    : "dark:text-white text-black"
                                    } text-[18px] font-[400] font-Poppins px-6`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    ))}
            </div>
            {isMobile && (
                <div className="825:hidden mt-5">
                    <div className="w-full text-center py-6">
                        <Link
                            href={"/"}
                            className={`text-[25px] font-Poppins font-[500] logo-style`}
                        >
                            E-Learning
                        </Link>
                    </div>
                    {navItemsData &&
                        navItemsData.map((item, index) => (
                            <Link href={item.url} key={index} passHref>
                                <span
                                    className={`${activeItem === index
                                        ? "dark:text-[#37a39a] text-blue-500"
                                        : "dark:text-white text-black"
                                        } block py-5 text-[18px] font-[400] font-Poppins px-6`}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                </div>
            )}
        </>
    );
};