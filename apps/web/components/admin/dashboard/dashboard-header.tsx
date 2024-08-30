"use client"

import { ThemeSwitcher } from '@/components/layout/theme-switcher';
import { IoMdNotificationsOutline } from '@repo/ui/icon';
import React, { useState } from 'react';

const DashboardHeader = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='w-full top-5 left-0 p-6 fixed flex justify-end items-center'>
            <ThemeSwitcher />
            <div className='relative cursor-pointer m-2' onClick={() => setOpen(!open)}>
                <IoMdNotificationsOutline className="cursor-pointer text-2xl text-black dark:text-white" />
                <span className='absolute -top-2 -right-2 bg-[#37a39a] w-[20px] h-[20px] text-[12px] flex justify-center items-center text-white'>
                    3
                </span>
            </div>
            {
                open && (
                    <div className='w-[350px] h-[50vh] dark:bg-[#111c43] bg-white shadow-xl absolute rounded top-16 z-10'>
                        <h5 className='text-center text-[20px] font-Poppins dark:text-white text-black p-3'>
                            Notifications
                        </h5>
                        <div className='dark:bg-[#2d3a4ea1] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#00000047]'>
                            <div className='w-full flex justify-between p-2 items-center'>
                                <p className='text-black dark:text-white'>
                                    New Question Received
                                </p>
                                <p className='text-black dark:text-white cursor-pointer'>
                                    Mark as Read
                                </p>
                            </div>
                            <p className='text-black dark:text-white px-2'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam asperiores
                                fugiat totam sapiente qui mollitia expedita neque quos temporibus.
                            </p>
                            <p className='p-2 text-black dark:text-white text-[14px]'>
                                5 Days Ago
                            </p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default DashboardHeader;