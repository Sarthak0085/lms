"use client";

import { IoMdCheckmark } from '@repo/ui/icon';
import React from 'react'

interface CourseOptionsProps {
    active: number;
    setActive: (open: number) => void;
}

export const CourseOptions = ({ active, setActive }: CourseOptionsProps) => {
    const options = [
        "Course Details",
        "Course Data",
        "Course Content",
        "Course Preview",
    ]
    return (
        <div className='flex flex-row'>
            {
                options.map((option: any, index: number) => (
                    <div key={index} className='w-full flex py-4 pr-10 825:py-5 relative'>
                        <div className={`w-[25px] h-[25px] 825:w-[35px] 825:h-[35px] rounded-full flex items-center justify-center ${active + 1 > index ? "bg-blue-500" : "bg-gray-200 dark:bg-[#384766]"} relative`} >
                            <div className='mb-20'>
                                <h5
                                    className={`825:text-[20px] text-muted-foreground`}
                                >
                                    {option}
                                </h5>
                            </div>
                            <IoMdCheckmark className="text-[12px] 825:text-[30px]" />
                            {
                                index !== options.length - 1 && (
                                    <div className={`absolute w-[30px] 825:w-[60px] h-1 ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} right-[-100%]`}>

                                    </div>
                                )
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
};