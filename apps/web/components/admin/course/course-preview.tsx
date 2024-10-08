"use client";

import { Ratings } from "@/components/ratings";
import { CreateCourseSchema, EditCourseSchema } from "@/schemas";
import { Button, Input } from "@repo/ui";
import { IoIosCheckmarkCircleOutline, ReloadIcon, RxArrowLeft } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import React, { SetStateAction } from "react";
import * as z from "zod";
import MuxPlayer from "@mux/mux-player-react";
import { ReadText } from "@/components/read-text";

type formSchema = z.infer<typeof CreateCourseSchema> | z.infer<typeof EditCourseSchema>;

interface CoursePreviewProps {
    setActive: React.Dispatch<SetStateAction<number>>;
    handleCourseCreate: any;
    courseData: formSchema
    isEdit?: boolean;
    isPending: boolean;
}

export const CoursePreview = ({
    setActive,
    handleCourseCreate,
    isEdit,
    courseData,
    isPending,
}: CoursePreviewProps) => {
    const discountPercent =
        ((Number(courseData.course.estimatedPrice ?? courseData.course?.price) - Number(courseData.course?.price)) / Number(courseData.course?.price)) *
        100;

    const discountPercentage = discountPercent.toFixed(0);

    const createCourse = () => {
        handleCourseCreate(courseData);
    }

    return (
        <div className="w-[90%] mx-auto mt-16 md:mt-24">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <video className="w-full h-auto" controls autoPlay={false}>
                        <source src={courseData?.course?.demoUrl} />
                    </video>
                </div>
                <div className="flex items-center my-2">
                    <h1 className="pt-5 text-[25px]">
                        {Number(courseData.course?.price) === 0 ? "Free" : `₹. ` + Number(courseData.course?.price)}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        &#8377;. {courseData.course?.estimatedPrice}
                    </h5>
                    {discountPercent > 0 && <h4 className="pt-5 pl-4 text-[22px]">{discountPercentage}% Off</h4>}
                </div>
                <div className="flex items-center my-3 mb-5">
                    <Button
                        variant={"destructive"}
                        className="!w-[180px] font-Poppins"
                    >
                        Buy Now &#8377;. {courseData.course?.price}
                    </Button>
                </div>
                <div className="flex items-center my-5 justify-between">
                    <Input
                        type="text"
                        placeholder="Discount Coupon Code..."
                        className="1500:!w-[50%] 1100:!w-[60%]"
                    />
                    <Button
                        variant={"default"}
                        className="!w-[180px] font-Poppins"
                    >
                        Apply
                    </Button>
                </div>
                <div className="my-5 space-y-1">
                    <p className="pb-1">Source Code Included</p>
                    <p className="pb-1">Life Time Access</p>
                    <p className="pb-1">Certificate of Completion</p>
                    <p className="pb-3 825:pb-1">Premium Support</p>
                </div>
                <div className="w-full">
                    <div className="w-full 825:pr-5">
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            {courseData?.course?.title}
                        </h1>
                        <h2 className="text-[20px] font-Poppins font-[300]">
                            {courseData?.course?.subTitle}
                        </h2>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center">
                                <Ratings rating={0} />
                                <h5>0 Reviews</h5>
                            </div>
                            <h5>0 students</h5>
                        </div>
                        <h1 className="text-[25px] font-Poppins font-[600] mt-5">
                            What will you learn from this Course?
                        </h1>
                        {courseData?.benefits.map((item: { title: string }, index: number) => (
                            <div className="w-full flex 825:items-center py-2" key={index}>
                                <div className="w-[15px] mr-1">
                                    <IoIosCheckmarkCircleOutline size={20} />
                                </div>
                                <p className="pl-2">{item.title}</p>
                            </div>
                        ))}
                        <br />
                        <br />
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            What are the prerequisites to start this Course?
                        </h1>
                        {courseData?.prerequisites.map((item: { title: string }, index: number) => (
                            <div className="w-full flex 825:items-center py-2" key={index}>
                                <div className="w-[15px] mr-1">
                                    <IoIosCheckmarkCircleOutline size={20} />
                                </div>
                                <p className="pl-2">{item.title}</p>
                            </div>
                        ))}
                        <br />
                        <br />
                        <div className="w-full">
                            <h1 className="text-[20px] font-Poppins font-[600]">
                                Course Details
                            </h1>
                            <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden">
                                <ReadText value={courseData?.course?.description} />
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="w-full flex justify-between gap-2">
                            <Button
                                variant={"primary"}
                                className={cn(isPending && "cursor-not-allowed")}
                                disabled={isPending}
                                onClick={() => setActive(prev => prev - 1)}
                            >
                                <RxArrowLeft size={20} className="me-2" /> Prev
                            </Button>
                            <Button
                                variant={"primary"}
                                className={cn(isPending && "cursor-not-allowed")}
                                disabled={isPending}
                                onClick={createCourse}
                            >
                                {isPending && (
                                    <ReloadIcon
                                        className="mr-2 size-4 animate-spin"
                                        aria-hidden="true"
                                    />
                                )}
                                {isEdit ? "Update" : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};