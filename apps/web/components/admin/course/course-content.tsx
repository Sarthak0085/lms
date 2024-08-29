"use client"

import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";
import { CreateCourseSchema } from "@/schemas";
import { Button, Form, FormField } from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { CustomInput } from "@/components/custom-input";
import { AiOutlineDelete, BiPencil, ChevronDown, RiAddCircleLine, RxArrowLeft, RxArrowRight } from "@repo/ui/icon";
import { CourseContentLinks } from "./course-content-links";

interface CourseContentProps {
    active: number;
    setActive: (active: number) => void;
    form: ReturnType<typeof useForm<z.infer<typeof CreateCourseSchema>>>;
    isPending: boolean;
};

export const CourseContent = ({
    active,
    setActive,
    form,
    isPending
}: CourseContentProps) => {
    const { fields: contentFields, append, remove } = useFieldArray({
        control: form.control,
        name: "courseContentData"
    });

    const [isCollapsed, setIsCollapsed] = useState(
        Array(contentFields?.length).fill(false)
    );

    const [activeSection, setActiveSection] = useState(1);

    const inputRef = useRef<HTMLInputElement>(null);

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleAddNewContent = () => {
        const lastContent = form.watch("courseContentData").at(-1);
        if (
            lastContent?.title === "" ||
            lastContent?.description === "" ||
            lastContent?.videoUrl === "" ||
            lastContent?.links.some(link => link.title === "" || link.url === "")
        ) {
            // toast.error("Please fill all the fields first");
            console.error("Please fill all the fields first");
            return;
        }
        setActiveSection(activeSection + 1);
        append({
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            links: [{ title: "", url: "" }]
        });
    };

    const handleRemoveSection = (index: number) => {
        if (index > 0) {
            remove(index);
        }
    };

    const handleCollapseToggle = (index: number) => {
        console.log(index);

        const updatedCollapse = [...isCollapsed];
        updatedCollapse[index] = !updatedCollapse[index];
        console.log(updatedCollapse[index]);

        setIsCollapsed(updatedCollapse);
    };

    const newContentHandler = (item: any) => {
        const lastContent = form.watch("courseContentData").at(-1);
        if (
            item.title === "" ||
            item.description === "" ||
            item.videoUrl === "" ||
            item.links[0].title === "" ||
            item.links[0].url === ""
        ) {
            // toast.error("Please fill all the fields first");
            console.error("Please fill all the fields first")
        } else {
            let newVideoSection = "";
            if (contentFields.length > 0) {
                const lastVideoSection =
                    lastContent?.videoSection;

                // use the last videosection if available else user input
                if (lastVideoSection) {
                    newVideoSection = lastVideoSection;
                }
            }
            append({
                videoUrl: "",
                title: "",
                description: "",
                videoSection: newVideoSection,
                links: [{ title: "", url: "" }],
            });
        }
    };

    const prevButton = () => {
        setActive(active - 1);
    };

    const handleOptions = () => {
        const lastContent = form.watch("courseContentData").at(-1);
        if (
            lastContent?.title === "" ||
            lastContent?.description === "" ||
            lastContent?.videoUrl === "" ||
            lastContent?.links.some(link => link.title === "" || link.url === "")
        ) {
            // toast.error("Sections can't be empty");
            console.error("Sections can be empty")
            return;
        }

        setActive(active + 1);
        console.log("enc", form.getValues("courseContentData"));
    };

    return (
        <div className="w-[80%] m-auto mt-24 p-3">
            <Form {...form}>
                <form>
                    {contentFields.map((item: any, index: number) => {
                        const showSectionInput =
                            index === 0 ||
                            item.videoSection !== form.watch(`courseContentData.${index - 1}.videoSection`);
                        return (
                            <div
                                key={index || item?.id}
                                className={cn("w-full p-4", showSectionInput ? "mt-10" : "mb-0")}
                            >
                                {showSectionInput && (
                                    <div className="w-full relative flex items-center">
                                        <FormField
                                            control={form.control}
                                            name={`courseContentData.${index}.videoSection`}
                                            render={({ field }) => (
                                                <CustomInput
                                                    ref={inputRef}
                                                    label="Video Section"
                                                    name={field.name}
                                                    value={field.value}
                                                    placeholder="Enter video section"
                                                    type="text"
                                                    onChange={field.onChange}
                                                    onBlur={field.onBlur}
                                                    isPending={isPending}
                                                    required={true}
                                                    labelClassName="!text-[20px]"
                                                    inputClassName="!text-[16px] !border-none !outline-none"
                                                />
                                            )}
                                        />
                                        <div className="mx-2 translate-y-1/2">
                                            <BiPencil size={20} onClick={focusInput} className="cursor-pointer dark:text-white text-black" />
                                        </div>
                                    </div>
                                )}
                                <div className="w-full flex items-center justify-between mt-1 mb-3">
                                    {isCollapsed[index] && (
                                        form.getValues(`courseContentData.${index}.title`) && (
                                            <p className="font-Poppins mt-2 text-[18px] text-black dark:text-white">
                                                {index + 1}. {form.getValues(`courseContentData.${index}.title`)}
                                            </p>
                                        )
                                    )}
                                    {
                                        <div className="flex mt-3 items-center">
                                            <AiOutlineDelete
                                                className={cn("text-[20px] mr-2 text-black dark:text-white",
                                                    index > 0 ? "cursor-pointer" : "cursor-no-drop")}
                                                onClick={() => handleRemoveSection(index)}
                                            />
                                            <ChevronDown
                                                fontSize="large"
                                                className="text-black cursor-pointer dark:text-white"
                                                style={{
                                                    transform: isCollapsed[index]
                                                        ? "rotate(180deg)"
                                                        : "rotate(0deg)",
                                                }}
                                                onClick={() => handleCollapseToggle(index)}
                                            />
                                        </div>
                                    }
                                </div>
                                {!isCollapsed[index] && (
                                    <>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name={`courseContentData.${index}.title`}
                                                render={({ field }) => (
                                                    <CustomInput
                                                        label="Video Title"
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="Project Plan..."
                                                        type="text"
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        isPending={isPending}
                                                        required={true}
                                                    />
                                                )}
                                            />
                                            {/* <label className={`${styles.label}`}>Video Title</label>
                                                <input
                                                    type="text"
                                                    placeholder="Project Plan..."
                                                    className={`${styles.input}`}
                                                    value={item?.title}
                                                    onChange={(e: any) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].title = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                /> */}
                                        </div>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name={`courseContentData.${index}.videoUrl`}
                                                render={({ field }) => (
                                                    <CustomInput
                                                        label="Video Url"
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="ysuwiw92jwsj"
                                                        type="text"
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        isPending={isPending}
                                                        required={true}
                                                    />
                                                )}
                                            />
                                            {/* <label className={`${styles.label}`}>Video Url</label>
                                                <input
                                                    type="text"
                                                    placeholder="ysuwiw92jwsj"
                                                    className={`${styles.input}`}
                                                    value={item.videoUrl}
                                                    onChange={(e: any) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoUrl = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                /> */}
                                        </div>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name={`courseContentData.${index}.videoLength`}
                                                render={({ field }) => (
                                                    <CustomInput
                                                        label="Video Length (in minutes)"
                                                        name={field.name}
                                                        placeholder="20"
                                                        type="number"
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        isPending={isPending}
                                                        required={true}
                                                    />
                                                )}
                                            />
                                            {/* <label className={`${styles.label}`}>Video Length (in minutes)</label>
                                                <input
                                                    type="number"
                                                    placeholder="20"
                                                    className={`${styles.input}`}
                                                    value={item.videoLength}
                                                    onChange={(e: any) => {
                                                        const updatedData = [...courseContentData];
                                                        updatedData[index].videoLength = e.target.value;
                                                        setCourseContentData(updatedData);
                                                    }}
                                                /> */}
                                        </div>
                                        <div className="mb-3">
                                            <FormField
                                                control={form.control}
                                                name={`courseContentData.${index}.description`}
                                                render={({ field }) => (
                                                    <CustomInput
                                                        label="Video Description"
                                                        name={field.name}
                                                        value={field.value}
                                                        placeholder="Write an amazing description...."
                                                        type="text"
                                                        onChange={field.onChange}
                                                        onBlur={field.onBlur}
                                                        isPending={isPending}
                                                        rows={8}
                                                    />
                                                )}
                                            />
                                            <br />
                                        </div>
                                        <CourseContentLinks form={form} sectionIndex={index} isPending={isPending} />
                                        <br />
                                        {/* add new content button  */}
                                        {index === contentFields.length - 1 && (
                                            <div className="inline-block mb-4">
                                                <Button
                                                    variant={"outline"}
                                                    disabled={isPending}
                                                    onClick={(e) => newContentHandler(e)}
                                                >
                                                    <RiAddCircleLine size={16} className="me-1 dark:text-white text-black" /> Add New Content
                                                </Button>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                        )
                    })}
                    <Button
                        variant={"outline"}
                        onClick={() => handleAddNewContent()}
                    >
                        <RiAddCircleLine size={16} className="me-1" />
                        Add New Section
                    </Button>
                </form >
            </Form >
            <div className="w-full my-5 flex justify-between">
                <Button
                    variant={"primary"}
                    className='w-[45%] 825:w-[180px] '
                    onClick={() => prevButton()}
                >
                    <RxArrowLeft size={20} className="me-1" /> Prev
                </Button>
                <Button
                    variant={"primary"}
                    className='w-[45%] 825:w-[180px]'
                    onClick={() => handleOptions()}
                >
                    Next <RxArrowRight size={20} className="ms-1" />
                </Button>
            </div>
        </div>
    );
};

