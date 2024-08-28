"use client";

import React, { useEffect, useState } from 'react'
import CourseCard from '@/components/course/course-card';
import { courses } from '@/utils/data';

export const Courses = () => {

    return (
        <div className='w-[90%] mt-10 800px:w-[80%] m-auto'>
            <h1 className='text-center font-Poppins text-[25px] sm:text-3xl lg:text-4xl leading-[35px] dark:text-white 800px:leading-[60px] text-black font-[700] tracking-tight'>
                Expand your career <span className='text-gradient'>Oppurtunity</span>
                <br />
                with our courses
            </h1>
            <br />
            <br />
            <div className='grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                {courses && courses.map((item: any, index: number) => (
                    <CourseCard item={item} key={index} />
                ))}
            </div>
        </div>
    )
};