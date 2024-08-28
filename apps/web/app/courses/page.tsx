"use client"

import CourseCard from '@/components/course/course-card';
import { Header } from '@/components/header';
import { allCategories, courses } from '@/utils/data';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const CoursesPage = () => {
    const params = useSearchParams();
    const search = params?.get('title');
    const [coursesData, setCoursesData] = useState<any[]>([]);
    const [categories, setCategories] = useState("All");

    useEffect(() => {
        if (categories === "All") {
            setCoursesData(courses);
        }

        if (categories !== "All") {
            setCoursesData(
                courses?.filter((item: any) => item?.categories === categories)
            )
        }

        if (search) {
            setCoursesData(
                courses?.filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()))
            )
        }
    }, [coursesData, categories, search])


    return (

        <div className='w-full '>
            <Header />
            <div className='w-[95%] 800px:w-[85%] h-full cursor-pointer m-auto min-h-[70vh]'>
                <div className='w-full mt-10 flex items-center flex-wrap'>
                    <div
                        className={`h-[35px] m-3 px-3 rounded-[30px] font-Poppins ${categories === "All" ? "bg-[crimson]" : "bg-blue-500"} flex items-center justify-center cursor-pointer`}
                        onClick={() => setCategories("All")}
                    >
                        All
                    </div>
                    {
                        allCategories.map((item: any, index: number) => (
                            <div
                                key={index}
                                className={`h-[35px] m-3 px-3 rounded-[30px] font-Poppins ${categories === item.title ? "bg-[crimson]" : "bg-blue-500"} flex items-center justify-center cursor-pointer`}
                                onClick={() => setCategories(item?.title)}
                            >
                                {item.title}
                            </div>
                        ))
                    }
                </div>
                {
                    courses && courses.length === 0 && (
                        <p className={` flex items-center justify-center min-h-[50vh]`}>
                            {search ? "No Course Found" : "No course found in this category. Please try another one."}
                        </p>
                    )
                }
                <br />
                <br />
                <div className='grid grid-cols-1 md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                    {courses && courses.map((item: any, index: number) => (
                        <CourseCard item={item} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CoursesPage;