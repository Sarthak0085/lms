"use client"

import React, { useEffect, useState, useTransition } from 'react'
import { redirect } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { CreateCourseSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { CourseInformation } from './course-information';

export const CreateCourse = () => {
    // useEffect(() => {
    //     if (isSuccess) {
    //         toast.success("Course Created Successfully!")
    //         redirect("/admin/all-courses");
    //     }
    //     if (error) {
    //         if ("data" in error) {
    //             const errorData = error as any;
    //             toast.error(errorData.data.message);
    //         }
    //     }
    // }, [isLoading, isSuccess, error])

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
                links: [{
                    title: "",
                    url: "",
                }]
            }],
            totalVideos: 0,
        }
    });

    // const [courseInfo, setCourseInfo] = useState({
    //     name: "",
    //     description: "",
    //     categories: "",
    //     price: "",
    //     estimatedPrice: "",
    //     tags: "",
    //     level: "",
    //     demoUrl: "",
    //     thumbnail: ""
    // });
    // const [benefits, setBenefits] = useState([{ title: "" }]);
    // const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
    // const [courseContentData, setCourseContentData] = useState([{
    //     videoUrl: "",
    //     title: "",
    //     description: "",
    //     videoLength: "",
    //     videoSection: "Untitled Section",
    //     links: [
    //         {
    //             title: "",
    //             url: ""
    //         }
    //     ],
    //     suggestion: "",
    // }]);
    // const [courseData, setCourseData] = useState({});

    // const handleSubmit = async () => {
    //     //format benefits array
    //     const formattedBenefits = benefits.map((benefit: any) => ({ title: benefit.title }));

    //     //format prerequisites array
    //     const formattedPrerequisites = prerequisites.map((prerequisites: any) => ({ title: prerequisites.title }));

    //     //format courseContent array
    //     const formattedCourseContentData = courseContentData.map((courseContent: any) => ({
    //         videoUrl: courseContent.videoUrl,
    //         title: courseContent.title,
    //         videoLength: courseContent.videoLength,
    //         description: courseContent.description,
    //         videoSection: courseContent.videoSection,
    //         links: courseContent.links.map((link: any) => ({
    //             title: link.title,
    //             url: link.url,
    //         })),
    //         suggestion: courseContent.suggestion,
    //     }));

    //     // Prepare our data object
    //     const data = {
    //         name: courseInfo.name,
    //         price: courseInfo.price,
    //         estimatedPrice: courseInfo.estimatedPrice,
    //         description: courseInfo.description,
    //         tags: courseInfo.tags,
    //         categories: courseInfo.categories,
    //         level: courseInfo.level,
    //         demoUrl: courseInfo.demoUrl,
    //         thumbnail: courseInfo.thumbnail,
    //         benefits: formattedBenefits,
    //         prerequisites: formattedPrerequisites,
    //         courseContentData: formattedCourseContentData,
    //         totalVideos: courseContentData.length,
    //     }

    //     setCourseData(data);
    // }

    const handleCourseCreate = async (e: any) => {
        // const data = courseData;
        // if (!isLoading) {
        //     await createCourse(data);
        // }
    }

    return (
        <div className='w-full flex min-h-screen'>
            <div className='w-[78%] '>
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
                {/* {
                    active === 1 && (
                        <CourseData
                            prerequisites={prerequisites}
                            setPrerequisites={setPrerequisites}
                            benefits={benefits}
                            setBenefits={setBenefits}
                            active={active}
                            setActive={setActive}
                        />
                    )
                }
                {
                    active === 2 && (
                        <CourseContent
                            courseContentData={courseContentData}
                            setCourseContentData={setCourseContentData}
                            active={active}
                            setActive={setActive}
                            handleSubmit={handleSubmit}
                        />
                    )
                }
                {
                    active === 3 && (
                        <CoursePreview
                            courseData={courseData}
                            active={active}
                            setActive={setActive}
                            handleCourseCreate={handleCourseCreate}
                        />
                    )
                } */}
            </div>
            <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-2'>
                {/* <CourseOptions active={active} setActive={setActive} /> */}
            </div>
        </div>
    )
};