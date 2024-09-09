"use client";

import { getSectionByCourseIdAndSectionId } from '@/actions/sections/get-sections';
import { useCurrentUser } from '@/hooks/use-current-user';
import MuxPlayer from '@mux/mux-player-react';
import { Content } from '@repo/db/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

type Props = {
    content: ReturnType<typeof getSectionByCourseIdAndSectionId>;
    courseId: string;
}

export const SectionDetails = ({ courseId, content }: Props) => {
    const { data, prevSection, nextSection } = React.use(content);
    console.log(data, prevSection, nextSection);
    const user = useCurrentUser();
    const [activeBar, setActiveBar] = useState(0);
    const [question, setQuestion] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [answer, setAnswer] = useState('');
    const [answerId, setAnswerId] = useState('');

    // const [addNewQuestion, { isSuccess, error, isLoading: isQuestionLoading }] = useAddNewQuestionsMutation();

    // const isReviewedExist = data?.review.find((item: any) => item.user._id === user._id);

    // const handleQuestionSubmit = async () => {
    //     if (question.length === 0) {
    //         toast.error("Questions can't be empty");
    //     } else {
    //         await addNewQuestion({ question, courseId: id, contentId: data[activeVideo]?._id });
    //         refetch();
    //     }
    // }

    // const handleAnswerSubmit = () => {

    // }

    // useEffect(() => {
    //     if (isSuccess) {
    //         setQuestion("");
    //     }

    //     if (error) {
    //         if ("data" in error) {
    //             const errorData = error as any;
    //             toast.error(errorData.data.message);
    //         }
    //     }
    // }, [isSuccess, error])

    return (
        <div className='w-[95%] 825:w-[85%] py-4 m-auto'>
            {/* <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} /> */}
            <div className='relative w-full !h-[400px]'>
                <MuxPlayer playbackId={data?.VideoMetadata?.playbackUrl} className='w-full h-[400px]' />
            </div>
            {/* <div className='w-full flex items-center justify-between my-3'>
                <div className={`${styles.button} !min-h-[40px] !py-[unset] ${activeVideo === 0 && "cursor-no-drop opacity-[0.8]"}`} onClick={() => setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)}>
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>
                <div className={`${styles.button} !min-h-[40px] !py-[unset] ${activeVideo === data.length - 1 && "cursor-no-drop opacity-[0.8]"}`} onClick={() => setActiveVideo(data && activeVideo === data.length - 1 ? activeVideo : activeVideo + 1)}>
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>
            </div> */}
            <h1 className='text-[25px] pt-2 font-[600] text-black dark:text-white'>
                {data?.title}
            </h1>
            <br />
            <div className='w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner'>
                {["Overview", "Resources", "Q&A", "Reviews"].map((text: string, index: number) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index && "text-blue-500 dark:text-[#37a39a]"}`}
                        onClick={() => setActiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            {
                activeBar === 0 && (
                    <p className='text-[18px] whitespace-pre-line mb-3 text-black dark:text-white'>
                        {data?.description}
                    </p>
                )
            }
            {
                activeBar === 1 && (
                    <div>
                        {
                            data?.links.map((item: any, index: number) => (
                                <div className="mb-5">
                                    <h2 className='800px:text-[20px] 800px:inline-block text-black dark:text-white'>
                                        {item.title && item.title + ":"}
                                    </h2>
                                    <a className='800px:pl-2 800px:text-[20px] inline-block text-blue-500 dark:text-[#37a39a]' href={item?.url} >{item?.url}</a>
                                </div>
                            ))
                        }
                    </div>
                )
            }
            {
                activeBar === 2 && (
                    <>
                        <div className='flex w-full'>
                            <Image
                                src={user?.image ? user?.image : ""}
                                width={50}
                                height={50}
                                alt='profile'
                                className='rounded-full'
                            />
                            <textarea
                                rows={8}
                                cols={40}
                                placeholder="Write your question...."
                                className={`outline-none bg-transparent ml-3 border border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins`}
                                value={question}
                                onChange={(e: any) =>
                                    setQuestion(e.target.value)
                                }
                            />
                        </div>
                        {/* <div className='w-full flex justify-end'>
                            <div
                                className={`button !w-[120px] !h-[40px] !text-[18px] mt-5 ${isQuestionLoading ? "cursor-no-drop" : ""}`}
                                onClick={() => { isQuestionLoading ? () => { } : handleQuestionSubmit }}
                            >
                                Submit
                            </div>
                        </div> */}
                        <br />
                        <br />
                        <div className='w-full h-[1px] bg-[#ffffff3b]'></div>
                        <div>
                            {/* <CommentReply data={data} user={user} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} setAnswerId={setAnswerId} /> */}
                        </div>
                    </>
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
        </div>
    )
}


const CommentReply = ({ data, user, answer, setAnswer, activeVideo, setAnswerId, handleAnswerSubmit }: any) => {
    return (
        <>
            <div className='w-full my-3'>
                {
                    data[activeVideo]?.questions.map((item: any, index: number) => (
                        <CommentItem key={index} index={index} data={data} item={item} activeVideo={activeVideo} answer={answer} setAnswer={setAnswer} handleAnswerSubmit={handleAnswerSubmit} />
                    ))
                }
            </div>
        </>
    )
}

const CommentItem = ({ data, index, answer, setAnswer, activeVideo, item, handleAnswerSubmit }: any) => {
    return (
        <>
            <div className='my-4'>
                <div className="flex mb-2">
                    <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                        <h1 className="uppercase text-black dark:text-white text-[18px]">
                            {item.user.name.slice(0, 2)}
                        </h1>
                    </div>
                    <div className="pl-3">
                        <h5 className="uppercase text-black dark:text-white text-[18px]">
                            {item?.user?.name}
                        </h5>
                        <p className="text-black dark:text-white">
                            {item?.question}
                        </p>
                        <small className="dark:text-[#ffffffe2] text-[#0000000e]">
                            {!item.createdAt ? "" : (item.createdAt)} •
                        </small>
                    </div>
                </div>
            </div>
        </>
    )
}