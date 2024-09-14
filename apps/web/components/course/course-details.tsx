"use client";

import React, { useState } from "react";
import { Ratings } from "@/components/ratings";
import { Button } from "@repo/ui";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Benefit, Prerequisite, } from "@repo/db/types";
import { IoIosCheckmarkCircleOutline, RxCross1 } from "@repo/ui/icon";
import MuxPlayer from "@mux/mux-player-react";
import { ExtendCourse } from "@/types";
import { ReadText } from "../read-text";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../checkout-form";
import { useRouter } from "next/navigation";
import { Reviews } from "./reviews";
import { LoginButton } from "../auth/login-button";
import { getCourseById } from "@/actions/course/get-course";
import { loadStripe } from "@stripe/stripe-js";

interface CourseDetailsProps {
    data: ReturnType<typeof getCourseById>;
    stripePromise: any;
}

// if (process.env.STRIPE_PUBLISHABLE_KEY === undefined) {
//     throw new Error("Stripe Publishable Key is not defined");
// }

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);
console.log('Stripe Publishable Key:', process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);


export const CourseDetails = ({
    data,
    // stripePromise,
}: CourseDetailsProps) => {
    const value = React.use(data);
    const course = value?.data;
    const router = useRouter();
    const user = useCurrentUser();
    const [open, setOpen] = useState(false);
    const [openLoginModal, setOpenLoginModal] = useState(false);
    const discountedPercentage = (
        ((Number(course?.estimatedPrice) - course?.price!) / course?.price!) *
        100
    ).toFixed(0);

    const isPurchased = course?.purchases?.find((pur) => pur.userId === user?.id);

    const handleClick = () => {
        if (!user || !user?.id) {
            setOpenLoginModal(true);
        } else {
            setOpen(true);
        }
    };
    console.log(stripePromise);

    return (
        <div>
            <div className="w-[90%] m-auto py-5">
                <div className="w-full flex flex-col-reverse 825:flex-row">
                    <div className="w-full 825:w-[65%] 825:pr-5">
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            {course?.title}
                        </h1>
                        <h2 className="text-[20px] font-Poppins font-[300]">
                            {course?.subTitle}
                        </h2>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={course?.ratings as number} />
                                <h5 className="text-black dark:text-white">
                                    {course?.reviews?.length} reviews
                                </h5>
                            </div>
                            <h5 className="text-black dark:text-white">
                                {course?.purchased} students
                            </h5>
                        </div>

                        <br />
                        <h4 className="title">
                            What will you learn from this course?
                        </h4>
                        <div>
                            {course &&
                                course?.benefits?.map((item: Benefit, index: number) => (
                                    <div
                                        className="w-full flex 825:items-center py-2"
                                        key={index}
                                    >
                                        <div className="w-[15px] mr-1">
                                            <IoIosCheckmarkCircleOutline
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
                        <h4 className="title">
                            What are the prerequisites to start this Course?
                        </h4>
                        <div>
                            {course &&
                                course?.prerequisites?.map((item: Prerequisite, index: number) => (
                                    <div
                                        className="w-full flex 825:items-center py-2"
                                        key={index}
                                    >
                                        <div className="w-[15px] mr-1">
                                            <IoIosCheckmarkCircleOutline
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
                        {/* <div className="w-full">
                            <h1 className={"title"}>Course Overview</h1>
                            {/* <CourseContentList data={data.courseData} isDemo={true} /> 
                        </div> */}
                        <br />
                        <div className="w-full">
                            <h1 className={"title"}>Course Details</h1>
                            <ReadText value={course?.description!} />
                        </div>
                        <br />
                        <Reviews course={course as ExtendCourse} />
                    </div>
                    <div className="w-full 825:w-[35%] relative">
                        <div className="825:sticky top-[100px] w-full z-20 left-0">
                            <MuxPlayer
                                playbackId={course?.demoMetadata?.playbackUrl ?? ""}
                                className="w-full rounded-md"
                            />
                        </div>
                        <div className="flex items-center">
                            <h1 className="pt-5 text-blue-500 text-[25px]">
                                {course?.price === 0 ? "Free" : `₹. ` + course?.price}
                            </h1>
                            <h5 className="pl-3 text-[crimson] text-[20px] mt-2 line-through opacity-80">
                                &#8377;. {course?.estimatedPrice}
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
                                    onClick={() => router.push(`/course/${course?.id}/sections`)}
                                >
                                    Enter to Course
                                </Button>
                            ) : (
                                <Button
                                    variant={"primary"}
                                    className="!w-[180px] my-3 font-poppins"
                                    onClick={() => handleClick()}
                                >
                                    Buy Now  &#8377;. {course?.price}
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
            {open &&
                <div className="w-full h-screen fixed top-0 left-0 z-50 flex items-center justify-center">
                    <div className="w-[500px] min-h-[500px] bg-gray-300 dark:bg-slate-800 rounded-xl p-3 shadow">
                        <div className="w-full flex justify-end">
                            <RxCross1 className="dark:text-white text-black cursor-pointer" size={40} onClick={() => setOpen(false)} />
                        </div>
                        <div className="w-full">
                            {
                                stripePromise &&
                                <Elements stripe={stripePromise} options={{
                                    mode: "payment",
                                    amount: course?.price,
                                    currency: "inr",
                                }}>
                                    <CheckoutForm data={course!} amount={course?.price!} estimatedPrice={course?.estimatedPrice} />
                                </Elements>
                            }
                        </div>
                    </div>
                </div>
            }
            {openLoginModal && <LoginButton open={openLoginModal} setOpen={setOpenLoginModal} mode="Modal" />}
        </div>
    );
};
