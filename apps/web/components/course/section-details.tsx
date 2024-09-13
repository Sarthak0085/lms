"use client";

import { getSectionByCourseIdAndSectionId } from '@/actions/sections/get-sections';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Link } from '@repo/db/types';
import React, { useState } from 'react'
import { QnASection } from './q&a';
import { VideoPlayer } from './video-player';
import { CreateReview } from './create-review';
import { Reviews } from './reviews';

interface SectionDetailsProps {
    content: ReturnType<typeof getSectionByCourseIdAndSectionId>;
    courseId: string;
}

export const SectionDetails = ({ courseId, content }: SectionDetailsProps) => {
    const { data, prevSection, nextSection } = React.use(content);
    const user = useCurrentUser();
    const [activeBar, setActiveBar] = useState(0);

    return (
        <div className='w-[95%] 825:w-[85%] py-4 m-auto'>
            <VideoPlayer
                courseId={courseId}
                contentId={data?.id}
                playbackUrl={data?.VideoMetadata?.playbackUrl}
                videoMetadata={data?.VideoMetadata}
                nextSection={nextSection}
                prevSection={prevSection}
                playbackUrl2={data?.videoUrl}
            />
            <h1 className='text-[25px] pt-2 font-[600] text-black dark:text-white'>
                {data?.title}
            </h1>
            <br />
            <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
                {["Overview", "Resources", "Q&A", "Reviews"].map((text: string, index: number) => (
                    <h5
                        key={index}
                        className={`825:text-[18px] cursor-pointer ${activeBar === index && "text-blue-500 dark:text-[#37a39a]"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            {
                activeBar === 0 && (
                    <p className='text-[18px] whitespace-pre-line my-3 text-black dark:text-white'>
                        {data?.description || data?.Course?.description}
                    </p>
                )
            }
            {
                activeBar === 1 && (
                    <div>
                        {
                            data?.links.map((item: Link, index: number) => (
                                <div key={index} className="my-5">
                                    <h2 className='825:inline-block text-black dark:text-white'>
                                        {item?.title && item.title + ":"}
                                    </h2>
                                    <a
                                        className='825:pl-2  inline-block text-blue-500 dark:text-[#37a39a]'
                                        href={item?.url}
                                        target='_blank'
                                    >
                                        {item?.url}
                                    </a>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <QnASection user={user!} contentId={data?.id!} courseId={courseId} />
                )
            }
            {
                activeBar === 3 && (
                    <>
                        <CreateReview user={user!} course={data?.Course!} />
                        <Reviews course={data?.Course!} />
                    </>
                )
            }
        </div >
    )
}

