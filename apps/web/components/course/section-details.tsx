"use client";

import { getSectionByCourseIdAndSectionId } from '@/actions/sections/get-sections';
import { useCurrentUser } from '@/hooks/use-current-user';
import MuxPlayer from '@mux/mux-player-react';
import { Content, Link } from '@repo/db/types';
import { Avatar, AvatarFallback, AvatarImage, Button, Textarea } from '@repo/ui';
import { ChevronLeftIcon, ChevronRightIcon, FaUser, RxArrowLeft, RxArrowRight } from '@repo/ui/icon';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { QnASection } from './q&a';
import { VideoPlayer } from './video-player';

type Props = {
    content: ReturnType<typeof getSectionByCourseIdAndSectionId>;
    courseId: string;
}

// if (isVideoEnd) {
//     fetch(`/api/courses/${courseId}/sections/${contentId}/video-progress`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             currentTimestamp: 0
//         })
//     }).then(() => { console.log("Reset progress") }).catch(() => { console.error("Error while reset the progress") })
//     fetch(`/api/courses/${courseId}/sections/${contentId}/markAsCompleted`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//     }).then(() => {
//         console.log('Video completion recorded.');
//         // if (nextSectionId !== undefined || nextSectionId !== "" || nextSectionId !== null) {
//         //     router.push(`/course/${courseId}/sections/${nextSectionId}`);
//         // }
//     }).catch((error) => {
//         console.error('Failed to record video completion:', error);
//     });
// }

export const SectionDetails = ({ courseId, content }: Props) => {
    const { data, prevSection, nextSection } = React.use(content);
    const router = useRouter();
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
            {/* {
                activeBar === 3 && (
                    <div className='w-full'>
                        {
                            !isReviewedExist && (
                                <div className='w-full flex '>
                                    <Image
                                        src={user?.avatar ? user?.avatar : ""}
                                        width={50}
                                        height={50}
                                        alt='profile'
                                        className='rounded-full object-cover w-[50px] h-[50px]'
                                    />
                                    <div className='w-full'>
                                        <h5 className='pl-3 text-[20px] text-black dark:text-white'>
                                            Give a Rating <span className='text-red-500'>*</span>
                                        </h5>
                                        <div className='flex w-full mr-2 pb-3'>
                                            {[1, 2, 3, 4, 5].map((i) =>
                                                rating >= i ? (<AiFillStar key={i} className="mr-2 cursor-pointer" size={25} color="rgb(246,186,0)" onClick={() => setRating(i)} />) : (<AiOutlineStar key={i} className="mr-2 cursor-pointer" size={25} color="rgb(246,186,0)" onClick={() => setRating(i)} />)
                                            )}
                                        </div>
                                        <textarea
                                            rows={5}
                                            cols={40}
                                            placeholder="Write your question...."
                                            className={`outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
                                            value={review}
                                            onChange={(e: any) =>
                                                setReview(e.target.value)
                                            }
                                        />
                                        <div className='w-full flex justify-end'>
                                            <div
                                                className={`${styles.button} !w-[120px] !h-[40px] !text-[18px] mt-5 ${isLoading ? "cursor-no-drop" : ""}`}
                                                onClick={() => { isLoading ? null : handleCommentSubmit }}
                                            >
                                                Submit
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            } */}
        </div >
    )
}

