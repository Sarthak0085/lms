"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { redirect } from 'next/navigation';
import * as z from "zod";
import { CreateCourseSchema } from '@/schemas';
import { CourseInformation } from './course-information';
import { CourseData } from './course-data';
import { CourseOptions } from './course-options';
import { CoursePreview } from './course-preview';
import { Category, Level } from '@repo/db/types';
import { createCourse } from '@/actions/course/create-course';
import { toast } from '@repo/ui';
import { getCategories } from '@/actions/category/get-categories';
import { useCurrentUser } from '@/hooks/use-current-user';

export const CreateCourse = () => {
    const [active, setActive] = useState(0);
    const [categories, setCategories] = useState<Category[]>([])
    const [isPending, startTransition] = useTransition();
    const [courseData, setCourseData] = useState<z.infer<typeof CreateCourseSchema>>({
        course: {
            title: "",
            subTitle: "",
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
    const user = useCurrentUser();
    console.log(user);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/categories`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const categories = await response.json();
            setCategories(categories);
        }
        fetchData();
    }, [])

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
                    <CourseOptions active={active} />
                </div>
                {
                    active === 0 && (
                        <CourseInformation
                            courseData={courseData}
                            setCourseData={setCourseData}
                            isPending={isPending}
                            setActive={setActive}
                            categories={categories}
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
                            setActive={setActive}
                            handleCourseCreate={handleCourseCreate}
                        />
                    )
                }
            </div>
        </div>
    )
};