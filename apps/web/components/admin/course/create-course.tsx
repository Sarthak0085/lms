"use client"

import React, { useState, useTransition } from 'react'
import { redirect } from 'next/navigation';
import * as z from "zod";
import { CreateCourseSchema } from '@/schemas';
import { CourseInformation } from './course-information';
import { CourseData } from './course-data';
import { CourseOptions } from './course-options';
import { CoursePreview } from './course-preview';
import { Level } from '@repo/db/types';
import { createCourse } from '@/actions/course/create-course';
import { toast } from '@repo/ui';

export const CreateCourse = () => {
    const [active, setActive] = useState(0);
    const [isPending, startTransition] = useTransition();
    const [courseData, setCourseData] = useState<z.infer<typeof CreateCourseSchema>>({
        course: {
            name: "",
            slug: "",
            description: "",
            tags: "",
            price: "",
            estimatedPrice: "",
            thumbnail: "",
            demoUrl: "",
            level: Level.BEGINNER,
            category: "",

        },
        benefits: [{ title: "" }],
        prerequisites: [{ title: "" }],
    });

    // const form = useForm<z.infer<typeof CreateCourseSchema>>({
    //     resolver: zodResolver(CreateCourseSchema),
    //     defaultValues: {
    //         name: "",
    //         description: "",
    //         tags: "",
    //         category: "",
    //         price: "",
    //         estimatedPrice: "",
    //         level: "",
    //         thumbnail: "",
    //         demoUrl: "",
    //         benefits: [{ title: "" }],
    //         prerequisites: [{ title: "" }],
    //         courseContentData: [{
    //             title: "",
    //             description: "",
    //             suggestion: "",
    //             videoUrl: "",
    //             videoSection: "Untitled Section",
    //             videoLength: 0,
    //             links: [{
    //                 title: "",
    //                 url: "",
    //             }]
    //         }],
    //         totalVideos: 0,
    //     }
    // });

    const handleCourseCreate = async () => {
        startTransition(() => {
            createCourse(courseData)
                .then(({ error, success, data }) => {
                    if (error) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: error,
                        });
                    }
                    if (success) {
                        toast({
                            variant: "success",
                            title: "Success!!",
                            description: success
                        });
                        redirect(`/admin/course/${data?.id}`);
                    }
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with creating the course.",
                    });
                })
        })
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
                            courseData={courseData}
                            setCourseData={setCourseData}
                            isPending={isPending}
                            active={active}
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
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {/* {
                    active === 2 && (
                        <CourseContent
                            form={form}
                            isPending={isPending}
                            active={active}
                            setActive={setActive}
                        />
                    )
                } */}
                {
                    active === 2 && (
                        <CoursePreview
                            courseData={courseData}
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