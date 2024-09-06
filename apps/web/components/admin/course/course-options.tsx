"use client";

import { cn } from '@repo/ui/lib/utils';
import React, { Fragment } from 'react'

interface CourseOptionsProps {
    active: number;
}

export const CourseOptions = ({ active }: CourseOptionsProps) => {
    const options = [
        "Course Details",
        "Course Requirements",
        // "Course Content",
        "Course Preview",
    ]
    return (
        <div className="mx-4 pt-4">
            <div className="flex items-center">
                {options.map((option, index) => (
                    <Fragment key={index}>
                        <div className="flex items-center text-muted-foreground relative">
                            <div
                                className={cn("rounded-full transition duration-500 text-center font-medium ease-in-out h-8 w-8 md:h-12 md:w-12 border-2 py-1 md:py-2",
                                    active === index ? "border-teal-600 text-teal-600" : active > index ? "border-teal-600 bg-teal-600 text-white" : "border-muted-foreground"
                                )}>
                                <span className='text-[16px] md:text-[20px] '>
                                    {index + 1}
                                </span>
                            </div>
                            <div className={cn("absolute top-0 -ml-10 text-center md:block hidden text-wrap mt-16 w-32 text-xs font-semibold uppercase",
                                active >= index ? "text-teal-600" : "text-muted-foreground"
                            )}>
                                {option}
                            </div>
                        </div>
                        {index !== 2 && <div
                            className={cn("flex-auto border-t-[6px] transition duration-500 ease-in-out",
                                active > index ? "border-teal-600" : "border-muted-foreground"
                            )}></div>}
                    </Fragment>
                ))}
                {/* <div className="flex items-center text-teal-600 relative">
                    <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bookmark ">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Personal</div>
                </div>
                <div className="flex items-center text-white relative">
                    <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 bg-teal-600 border-teal-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-user-plus ">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                            <circle cx="8.5" cy="7" r="4"></circle>
                            <line x1="20" y1="8" x2="20" y2="14"></line>
                            <line x1="23" y1="11" x2="17" y2="11"></line>
                        </svg>
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-teal-600">Account</div>
                </div>
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                <div className="flex items-center text-gray-500 relative">
                    <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-mail ">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                            <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Message</div>
                </div>
                <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300"></div>
                <div className="flex items-center text-gray-500 relative">
                    <div className="rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-database ">
                            <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                            <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                            <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                    </div>
                    <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500">Confirm</div>
                </div> */}
            </div>
        </div>
    )
};