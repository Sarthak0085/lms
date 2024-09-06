"use client"

import React, { useState, useTransition } from 'react'
import * as z from "zod";
import { EditCourseSchema } from '@/schemas';
import { CourseInformation } from './course-information';
import { CourseData } from './course-data';
import { CourseOptions } from './course-options';
import { CoursePreview } from './course-preview';
import { Benefit, Course, Level, Prerequisite } from '@repo/db/types';

type CourseType = Course & {
    benefits: Benefit[];
    prerequisites: Prerequisite[];
}

interface EditCourseProps {
    data: CourseType
}

export const EditCourse = ({ data }: EditCourseProps) => {
    const [active, setActive] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [courseData, setCourseData] = useState<z.infer<typeof EditCourseSchema>>({
        course: {
            id: data?.id ?? "",
            title: data?.title ?? "",
            subTitle: data?.subTitle ?? "",
            slug: data?.slug ?? "",
            description: data?.description ?? "",
            tags: data?.tags ?? "",
            price: String(data?.price) ?? "",
            estimatedPrice: String(data?.estimatedPrice) ?? "",
            thumbnail: data?.thumbnail ?? "",
            demoUrl: data?.demoUrl ?? "",
            level: data?.level ?? Level.BEGINNER,
            category: data?.category ?? "",
        },
        benefits: data?.benefits.map((benefit) => ({ title: benefit.title })) ?? [{ title: "" }],
        prerequisites: data?.prerequisites.map((prerequisite) => ({ title: prerequisite.title })) ?? [{ title: "" }],
    });

    const handleCourseCreate = async (data: z.infer<typeof EditCourseSchema>) => {
        console.log(data);
        startTransition(() => { });
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full sm:w-[78%] '>
                <div className='mt-20'>
                    <CourseOptions active={active} />
                </div>
                {
                    active === 0 && (
                        <CourseInformation
                            courseData={courseData}
                            setCourseData={setCourseData}
                            isPending={isPending}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                            courseData={courseData}
                            setCourseData={setCourseData}
                            isPending={isPending}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CoursePreview
                            courseData={courseData}
                            isPending={isPending}
                            isEdit={true}
                            setActive={setActive}
                            handleCourseCreate={handleCourseCreate}
                        />
                    )
                }
            </div>
        </div>
    )
};