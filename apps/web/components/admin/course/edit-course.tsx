"use client"

import React, { useState, useTransition } from 'react'
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { CreateCourseSchema, EditCourseSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseInformation } from './course-information';
import { CourseData } from './course-data';
import { CourseContent } from './course-content';
import { CourseOptions } from './course-options';
import { CoursePreview } from './course-preview';
import { title } from 'process';
import { courses } from '@/utils/data';

export const EditCourse = ({ id }: { id: string }) => {
    const [active, setActive] = useState(0);
    const [isPending, startTransition] = useTransition();
    const data: z.infer<typeof EditCourseSchema> = courses[1];

    const form = useForm<z.infer<typeof EditCourseSchema>>({
        resolver: zodResolver(EditCourseSchema),
        defaultValues: {
            id: data?.id ?? "",
            name: data?.name ?? "",
            description: data?.description ?? "",
            tags: data?.tags ?? "",
            category: data?.category ?? "",
            price: data?.price ?? "",
            estimatedPrice: data?.estimatedPrice ?? "",
            level: data?.level ?? "",
            thumbnail: data.thumbnail ?? "",
            demoUrl: data?.demoUrl ?? "",
            benefits: data?.benefits.map((benefit) => benefit ?? ""),
            prerequisites: data?.prerequisites.map((prerequisite) => prerequisite ?? ""),
            courseContentData: data?.courseContentData?.map((courseContent) => ({
                title: courseContent?.title ?? "",
                description: courseContent?.description ?? "",
                suggestion: courseContent?.suggestion ?? "",
                videoUrl: courseContent?.videoUrl ?? "",
                videoLength: courseContent?.videoLength ?? 0,
                videoSection: courseContent?.videoSection ?? "Untitled Section",
                links: courseContent?.links?.map((link) => ({
                    title: link.title ?? "",
                    url: link.url ?? "",
                })),
            })),
            totalVideos: data?.totalVideos ?? 0,
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
            <div className='w-full sm:w-[78%] '>
                <div className='mt-20'>
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