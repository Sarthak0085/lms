import React, { useState } from "react";
import Link from "next/link";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm";
import { Ratings } from "@/components/ratings";
import { Button } from "@repo/ui";

interface CourseDetailsProps {
    data: any;
    stripePromise: any;
    clientSecret: any;
};

export const CourseDetails = ({
    data,
    stripePromise,
    clientSecret
}: CourseDetailsProps) => {
    const user = {};
    const [open, setOpen] = useState(false)
    const discountedPercentage = (
        ((data?.estimatedPrice - data?.price) / data?.price) *
        100
    ).toFixed(0);

    const isPurchased =
        user && user.courses.find((item: any) => item._id === data._id);

    const handleOrder = () => {
        setOpen(true)
    };

    return (
        <div>
            <div className="w-[90%] m-auto py-5">
                <div className="w-full flex-col-reverse 825:flex-row">
                    <div className="w-full 825:w-[65%] 825:pr-5">
                        <h1 className={`title !text-[25px]`}>{data?.name}</h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={data?.ratings} />
                                <h5 className="text-black dark:text-white">
                                    {data?.reviews.length} reviews
                                </h5>
                            </div>
                            <h5 className="text-black dark:text-white">
                                {data?.purchased} students
                            </h5>
                        </div>

                        <br />
                        <h1 className="title">
                            What will you learn from this course?
                        </h1>
                        <div>
                            {data &&
                                data?.benefits?.map((item: any, index: number) => (
                                    <div
                                        className="w-full flex 825:items-center py-2"
                                        key={index}
                                    >
                                        <div className="w-[15px] mr-1">
                                            <IoCheckmarkDoneOutline
                                                size={20}
                                                className="text-black dark:text-white"
                                            />
                                        </div>
                                        <p className="pl-2 text-black dark:text-white">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            <br />
                            <br />
                        </div>
                        <div>
                            {data &&
                                data?.prerequisites?.map((item: any, index: number) => (
                                    <div
                                        className="w-full flex 825:items-center py-2"
                                        key={index}
                                    >
                                        <div className="w-[15px] mr-1">
                                            <IoCheckmarkDoneOutline
                                                size={20}
                                                className="text-black dark:text-white"
                                            />
                                        </div>
                                        <p className="pl-2 text-black dark:text-white">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            <br />
                            <br />
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className={"title"}>Course Overview</h1>
                            {/* <CourseContentList data={data.courseData} isDemo={true} /> */}
                        </div>
                        <br />
                        <div className="w-full">
                            <h1 className={"title"}>Course Details</h1>
                            <p className="text-[18px] mt-[20px] whitespace-pre-line overflow-hidden w-full text-black dark:text-white">
                                {data?.description}
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="w-full">
                            <div className="825:flex items-center">
                                <Ratings rating={data?.ratings} />
                                <div className="mb-2 825:mb-[unset]">
                                    <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                                        {Number.isInteger(data?.ratings)
                                            ? data?.ratings.toFixed(1)
                                            : data?.ratings.toFixed(2)}{" "}
                                        Course Rating * {data?.reviews.length} Reviews
                                    </h5>
                                </div>
                                <br />
                                {(data?.reviews && [...data.reviews].reverse()).map(
                                    (item: any, index: number) => (
                                        <div className="w-full pb-4" key={index}>
                                            <div className="flex">
                                                <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer">
                                                    <h1 className="uppercase text-black dark:text-white text-[18px]">
                                                        {item.user.name.slice(0, 2)}
                                                    </h1>
                                                </div>
                                                <div className="hidden 800px:block pl-2">
                                                    <div className="flex items-center">
                                                        <h5 className="uppercase text-black dark:text-white text-[18px]">
                                                            {item.user.name}
                                                        </h5>
                                                        <Ratings rating={item.rating} />
                                                    </div>
                                                    <p className="text-black dark:text-white">
                                                        {item.comment}
                                                    </p>
                                                    <small className="dark:text-[#ffffffe2] text-[#0000000e]">
                                                        {(item.createdAt)} •
                                                    </small>
                                                </div>
                                                <div className="pl-2 825:hidden flex items-center">
                                                    <h5 className="uppercase text-black dark:text-white text-[18px]">
                                                        {item.user.name}
                                                    </h5>
                                                    <Ratings rating={item.rating} />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="w-full 825:w-[35%] relative">
                        <div className="sticky top-[100px] w-full z-20 left-0">
                            {/* <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} /> */}
                        </div>
                        <div className="flex items-center">
                            <h1 className="pt-5 text-blue-500 text-[25px]">
                                {data?.price === 0 ? "Free" : "&rupee;." + data?.price}
                            </h1>
                            <h5 className="pl-3 text-[crimson] text-[20px] mt-2 line-through opacity-80">
                                &rupee;. {data?.estimatedPrice}
                            </h5>
                            <h4 className="pt-5 pl-4 text-blue-500 text-[22px]">
                                {discountedPercentage}% Off
                            </h4>
                        </div>
                        <div className="flex items-center">
                            {isPurchased ? (
                                <Button
                                    variant={"primary"}
                                    asChild
                                    className="!w-[180px] my-3 font-poppins"
                                >
                                    <Link
                                        // className={"!w-[180px] my-3 font-Poppins !bg-[crimson]"}
                                        href={`/course-access/${data._id}`}
                                    >
                                        Enter to Course
                                    </Link>
                                </Button>
                            ) : (
                                <Button
                                    variant={"primary"}
                                    className="!w-[180px] my-3 font-poppins"
                                >
                                    Buy Now  &rupee;. {data?.price}
                                </Button>
                            )}
                        </div>
                        <br />
                        <p className="pb-1">• Source Code Included</p>
                        <p className="pb-1">• Life Time Access</p>
                        <p className="pb-1">• Certificate of Completion</p>
                        <p className="pb-3 825:pb-1">• Premium Support</p>
                    </div>
                </div>
            </div>
            <>
                <div className="w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center">
                    <div className="w-[500px] min-h-[500px] bg-gray-300 dark:bg-slate-800 rounded-xl p-3 shadow">
                        <div className="w-full flex justify-end">
                            <IoCloseOutline className="dark:text-white text-black cursor-pointer" size={40} onClick={() => setOpen(false)} />
                        </div>
                        <div className="w-full">
                            {
                                stripePromise && clientSecret &&
                                <Elements stripe={stripePromise} options={clientSecret}>
                                    <CheckoutForm setOpen={setOpen} data={data} />
                                </Elements>
                            }
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
};
