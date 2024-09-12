"use client"

import React, { useState } from 'react'
import { ProfileInfo } from './profile-info';
import { ChangePassword } from './change-password';
import { Sidebar } from './sidebar';
import { User } from 'next-auth';

export const Profile = ({ user }: { user?: User }) => {
    const [scroll, setScroll] = useState(false);
    const [active, setActive] = useState(1);

    const logoutHandler = async () => {
        // await signOut();
    }

    if (typeof window !== "undefined") {
        window.addEventListener("scroll", () => {
            if (scrollY > 85) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }

    return (
        <div className='w-[85%] min-h-[89dvh] flex mx-auto'>
            <div className={`w-[60px] 825:w-[310px] h-[450px] bg-opacity-90 border border-[#000] dark:border-[#ffffff1c] bg-white dark:bg-slate-900 rounded-[5px] shadow-xl dark:shadow-sm mt-[80px] mb-[80px] left-[30px] ${scroll ? "top-[120px]" : "top-[30px]"}`}>
                <Sidebar
                    user={user}
                    active={active}
                    setActive={setActive}
                />
            </div>
            {active === 1 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ProfileInfo user={user} />
                </div>
            )}
            {active === 2 && (
                <div className='w-full h-full bg-transparent mt-[80px]'>
                    <ChangePassword />
                </div>
            )}
        </div>
    )
}
