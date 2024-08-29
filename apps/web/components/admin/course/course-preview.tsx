"use client";

import { Ratings } from "@/components/ratings";
import { CreateCourseSchema } from "@/schemas";
import { Button, Input } from "@repo/ui";
import { IoIosCheckmarkCircleOutline, RxArrowLeft } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface CoursePreviewProps {
    active: number;
    setActive: (active: number) => void;
    handleCourseCreate: any;
    form: ReturnType<typeof useForm<z.infer<typeof CreateCourseSchema>>>
    isEdit?: boolean;
    isPending: boolean;
};

export const CoursePreview = ({
    active,
    setActive,
    handleCourseCreate,
    isEdit,
    form,
    isPending,
}: CoursePreviewProps) => {

    const { getValues } = form;

    const discountPercent =
        ((Number(getValues("estimatedPrice")) - Number(getValues("price"))) / Number(getValues("price"))) *
        100;

    const discountPercentage = discountPercent.toFixed(0);

    const createCourse = () => {
        handleCourseCreate();
    }

    return (
        <div className="w-[90%] m-auto py-5 mb-5">
            <div className="w-full relative">
                <div className="w-full mt-10">
                    {/* <CoursePlayer
                        title={courseData?.title}
                        videoUrl={courseData?.demoUrl}
                    /> */}
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px]">
                        {Number(getValues("price")) === 0 ? "Free" : `&#8377;.` + Number(getValues("price"))}
                    </h1>
                    <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80">
                        &#8377;. {getValues("estimatedPrice")}
                    </h5>
                    <h4 className="pt-5 pl-4 text-[22px]">{discountPercentage}% Off</h4>
                </div>
                <div className="flex items-center">
                    {/* <div
                        className={`${styles.button} !w-[180px] my-3 font-Poppins cursor-not-allowed !bg-[crimson]`}
                    >
                        Buy Now {getValues("price")}$
                    </div> */}
                    <Button
                        variant={"destructive"}
                        className="!w-[180px] font-Poppins"
                    >
                        Buy Now &#8377;. {getValues("price")}
                    </Button>
                </div>
                <div className="flex items-center my-3 justify-between">
                    {/* <input
                        type="text"
                        className={`${styles.input} 1500px:!w-[50%] 1100px:!w-[60%] ml-3 !mt-0`}
                        placeholder="Discount Coupon Code..."
                    /> */}
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
                    {/* <div
                        className={`${styles.button} !w-[120px] !ml-3 my-4 font-Poppins cursor-pointer`}
                    >
                        Apply
                    </div> */}
                </div>
                <p className="pb-1">Source Code Included</p>
                <p className="pb-1">Life Time Access</p>
                <p className="pb-1">Certificate of Completion</p>
                <p className="pb-3 825:pb-1">Premium Support</p>
                <div className="w-full">
                    <div className="w-full 825:pr-5">
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            {getValues("name")}
                        </h1>
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center">
                                <Ratings rating={0} />
                                <h5>0 Reviews</h5>
                            </div>
                            <h5>0 students</h5>
                        </div>
                        <h1 className="text-[25px] font-Poppins font-[600]">
                            What will you learn from this Course?
                        </h1>
                        {getValues("benefits").map((item: { title: string }, index: number) => (
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
                        {getValues("prerequisites").map((item: { title: string }, index: number) => (
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
                                {getValues("description")}
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className="w-full flex justify-between">
                            <Button
                                variant={"primary"}
                                className={cn("!w-full 825:!w-[180px]", isPending && "cursor-not-allowed")}
                                disabled={isPending}
                                onClick={() => setActive(active - 1)}
                            >
                                <RxArrowLeft size={20} className="me-1" /> Prev
                            </Button>
                            <Button
                                variant={"primary"}
                                className={cn("!w-full 825:!w-[180px]", isPending && "cursor-not-allowed")}
                                disabled={isPending}
                                onClick={createCourse}
                            >
                                {isEdit ? "Update" : "Create"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};