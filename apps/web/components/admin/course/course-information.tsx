"use client"

import { CustomInput } from '@/components/custom-input';
import { CreateCourseSchema } from '@/schemas';
import { data } from '@/utils/data';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui';
import { RxArrowRight } from '@repo/ui/icon';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";

interface CourseInformationProps {
    form: ReturnType<typeof useForm<z.infer<typeof CreateCourseSchema>>>;
    active: number;
    setActive: (active: number) => void;
    isPending: boolean;
}

export const CourseInformation = ({
    form,
    active,
    setActive,
    isPending
}: CourseInformationProps) => {
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState<any>([]);
    const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
    }, [data]);


    const handleChange = (e: any) => {
        const file = e.target?.files?.[0];
        console.log(file);
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    console.log(true);
                    form.setValue("thumbnail", fileReader.result as string);
                    setThumbnail(fileReader.result);
                }
            }
            fileReader.readAsDataURL(file);
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: any) => {
        e.preventDefault();
        setDragging(false);
    }

    const handleDrop = (e: any) => {
        e.preventDefault();
        setDragging(false);

        const file = e.dataTransfer.files?.[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                if (fileReader.readyState === 2) {
                    form.setValue("thumbnail", fileReader.result as string);
                }
            }
            fileReader.readAsDataURL(file);
        }
    }

    const handleSubmit = (e: any) => {
        if (form.getValues("name") === "" || form.getValues("description") === "" || form.getValues("price") === "" || form.getValues("tags") === "" || form.getValues("category") === "" || form.getValues("level") === "" || form.getValues("demoUrl") === "" || form.getValues("thumbnail") === "") {
            // toast.error("Please fill all the fields");
            e.preventDefault();
        }
        else {
            e.preventDefault();
            setActive(active + 1);
        }
    }

    return (
        <div className='w-[80%] m-auto mt-24'>
            <Form {...form}>
                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name='name'
                            render={({ field }) => (
                                <CustomInput
                                    label='Course Name'
                                    name={field.name}
                                    value={field.value}
                                    placeholder='NextJs LMS platform with next 14'
                                    type="text"
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    isPending={isPending}
                                    required={true}
                                />
                            )}
                        />
                    </div>
                    <div className='mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                                <CustomInput
                                    label='Course Description'
                                    name={field.name}
                                    value={field.value}
                                    type='text'
                                    placeholder='NextJs LMS platform with next 14'
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    isPending={isPending}
                                    required={true}
                                    rows={8}
                                />
                            )}
                        />
                        {/* <label htmlFor='description' className={`${styles.label}`}>
                            Course Description
                        </label>
                        <textarea
                            name='description'
                            id='description'
                            cols={30}
                            rows={8}
                            required
                            value={courseInfo?.description}
                            onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, description: e.target.value })
                            }
                            placeholder='Give an awesome Description....'
                            className={`${styles.input} !h-min !py-2`}
                        /> */}
                    </div>
                    <div className='w-full 825:mb-5 825:flex justify-between'>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='price'
                                render={({ field }) => (
                                    <CustomInput
                                        label='Course Price'
                                        name={field.name}
                                        value={field.value}
                                        placeholder='499'
                                        type="number"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                        required={true}
                                    />
                                )}
                            />
                        </div>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='estimatedPrice'
                                render={({ field }) => (
                                    <CustomInput
                                        label='Estimated Price'
                                        name={field.name}
                                        value={field.value}
                                        placeholder='1499'
                                        type="number"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    <div className='w-full 825:mb-5 825:flex justify-between'>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='category'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Category <span className='text-[crimson] ms-1'>*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select a Category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {categories.map((category: any) => (
                                                    <SelectItem key={category?.id} value={category?.title}>{category?.title}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='level'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Course Level <span className='text-[crimson] ms-1'>*</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger >
                                                    <SelectValue placeholder="Select a Level" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value='Beginner'>Beginner</SelectItem>
                                                <SelectItem value='Intermediate'>Intermediate</SelectItem>
                                                <SelectItem value='Advanced'>Advanced</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='w-full 825:mb-5 825:flex justify-between'>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='tags'
                                render={({ field }) => (
                                    <CustomInput
                                        label='Course Tags'
                                        name={field.name}
                                        value={field.value}
                                        placeholder='Next Js, React Js, LMS'
                                        type="text"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                        required={true}
                                    />
                                )}
                            />
                        </div>
                        <div className='825:w-[45%] w-full mb-5'>
                            <FormField
                                control={form.control}
                                name='demoUrl'
                                render={({ field }) => (
                                    <CustomInput
                                        label='Demo url'
                                        name={field.name}
                                        value={field.value}
                                        placeholder='fhhswu32gjjw22'
                                        type="text"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                        required={true}
                                    />
                                )}
                            />
                        </div>
                    </div>
                    {/* <div className='w-full 800px:mb-5 800px:flex justify-between'> */}
                    {/* <div className='800px:w-[45%] w-full mb-5'>
                            <label htmlFor='tags' className={`${styles.label}`}>
                                Course Tags
                            </label>
                            <input
                                type='text'
                                name='tags'
                                id='tags'
                                required
                                value={courseInfo?.tags}
                                onChange={(e: any) =>
                                    setCourseInfo({ ...courseInfo, tags: e.target.value })
                                }
                                placeholder='MERN/SocketIO/tailwindcss'
                                className={`${styles.input}`}
                            />
                        </div>
                        <div className='800px:w-[45%] w-full mb-5'>
                            <label htmlFor='categories' className={`${styles.label}`}>
                                Course Categories
                            </label>
                            <select name='categories' id='categories' value={courseInfo.categories} onChange={(e: any) =>
                                setCourseInfo({ ...courseInfo, categories: e.target.value })
                            } className={`${styles.input}`}>
                                <option value=''>Choose Category</option>
                                {
                                    categories.map((item: any) => (
                                        <option value={item.title} key={item._id}>
                                            {item?.title}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='w-full 800px:mb-5 800px:flex justify-between'>
                            <div className='800px:w-[45%] w-full mb-5'>
                                <label htmlFor='level' className={`${styles.label}`}>
                                    Course Level
                                </label>
                                <input
                                    type='text'
                                    name='level'
                                    id='level'
                                    required
                                    value={courseInfo?.level}
                                    onChange={(e: any) =>
                                        setCourseInfo({ ...courseInfo, level: e.target.value })
                                    }
                                    placeholder='BEginner/Intermediate/Expert'
                                    className={`${styles.input}`}
                                />
                            </div>
                            <div className='800px:w-[45%] w-full mb-5'>
                                <label htmlFor='url' className={`${styles.label}`}>
                                    Demo url
                                </label>
                                <input
                                    type='text'
                                    name='url'
                                    id='url'
                                    value={courseInfo?.demoUrl}
                                    onChange={(e: any) =>
                                        setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                                    }
                                    placeholder='fhhswu32gjjw22'
                                    className={`${styles.input}`}
                                />
                            </div>
                        </div> */}
                    <div className='w-full'>
                        <Input
                            type='file'
                            id='file'
                            accept='image/*'
                            className={`hidden`}
                            onChange={(e) => handleChange(e)}
                        />
                        <Label
                            htmlFor='file'
                            className={`w-full min-h-[10vh] cursor-pointer dark:border-white border-[#00000026] p-3 border flex 
                                items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {
                                thumbnail ?
                                    (
                                        <Image
                                            src={thumbnail as string}
                                            alt="Thumbnail"
                                            width={200}
                                            height={200}
                                            className="w-full max-h-full object-cover" />
                                    ) : (
                                        <span className='text-black dark:text-white'>
                                            Drag or drop your thumbnail here or click to browse
                                        </span>
                                    )
                            }
                        </Label>
                    </div>
                    <br />
                    <div className='w-full flex items-center justify-end relative '>
                        <Button
                            variant={"primary"}
                            type='submit'
                            disabled={isPending}
                            className={cn(isPending && "cursor-not-allowed")}
                        >
                            Next <RxArrowRight size={20} className="ms-1" />
                        </Button>
                    </div>
                    <br />
                    <br />
                </form>
            </Form>
        </div>
    )
};