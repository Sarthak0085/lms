"use client"

import React, { useState, useTransition } from 'react'
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { CreateCourseSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseInformation } from './course-information';
import { CourseData } from './course-data';
import { CourseContent } from './course-content';
import { CourseOptions } from './course-options';
import { CoursePreview } from './course-preview';

export const CreateCourse = () => {
    const [active, setActive] = useState(0);
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof CreateCourseSchema>>({
        resolver: zodResolver(CreateCourseSchema),
        defaultValues: {
            name: "",
            description: "",
            tags: "",
            category: "",
            price: "",
            estimatedPrice: "",
            level: "",
            thumbnail: "",
            demoUrl: "",
            benefits: [{ title: "" }],
            prerequisites: [{ title: "" }],
            courseContentData: [{
                title: "",
                description: "",
                suggestion: "",
                videoUrl: "",
                videoSection: "Untitled Section",
                videoLength: 0,
                links: [{
                    title: "",
                    url: "",
                }]
            }],
            totalVideos: 0,
        }
    });

    const handleCourseCreate = async (e: any) => {
        console.log(form.getValues())
        // const data = courseData;
        // if (!isLoading) {
        //     await createCourse(data);
        // }
    }

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='w-full sm:w-[78%]'>
                <div className='mt-10'>
                    <CourseOptions active={active} setActive={setActive} />
                </div>
                {
                    active === 0 && (
                        <CourseInformation
                            form={form}
                            isPending={isPending}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 1 && (
                        <CourseData
                            form={form}
                            isPending={isPending}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            form={form}
                            isPending={isPending}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            form={form}
                            isPending={isPending}
                            active={active}
                            setActive={setActive}
                            handleCourseCreate={handleCourseCreate}
                        />
                    )
                }
            </div>
        </div>
    )
};