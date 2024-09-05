"use client"

import { CustomInput } from '@/components/custom-input';
import FileUpload from '@/components/file-upload';
import { CourseSchema, CreateCourseSchema, EditCourseSchema } from '@/schemas';
import { data } from '@/utils/data';
import { zodResolver } from '@hookform/resolvers/zod';
import { Level } from '@repo/db/types';
import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    useToast
} from '@repo/ui';
import { RxArrowRight } from '@repo/ui/icon';
import { cn } from '@repo/ui/lib/utils';
import Image from 'next/image';
import React, { useState, useEffect, MouseEvent, SetStateAction } from 'react'
import { useForm } from 'react-hook-form';
import * as z from "zod";

type formSchema = typeof CreateCourseSchema | typeof EditCourseSchema;

interface CourseInformationProps {
    courseData: formSchema,
    setCourseData: React.Dispatch<SetStateAction<formSchema>>
    active: number;
    setActive: React.Dispatch<SetStateAction<number>>;
    isPending: boolean;
}

export const CourseInformation = ({
    courseData,
    setCourseData,
    active,
    setActive,
    isPending
}: CourseInformationProps) => {
    const { toast } = useToast();
    const [dragging, setDragging] = useState(false);
    const [categories, setCategories] = useState<any>([]);

    const form = useForm<z.infer<typeof CourseSchema>>({
        resolver: zodResolver(CourseSchema),
        defaultValues: {
            name: courseData?.name ?? "",
            slug: courseData?.slug ?? "",
            price: courseData?.price ?? 0,
            category: courseData?.category ?? "",
            level: courseData?.level ?? Level.BEGINNER,
            thumbnail: courseData?.thumbnail ?? "",
            demoUrl: courseData?.demoUrl ?? "",
            description: courseData?.description ?? "",
            tags: courseData?.tags ?? "",
        }
    })
    const [thumbnail, setThumbnail] = useState<string | ArrayBuffer | null>(form.getValues("thumbnail"));

    useEffect(() => {
        if (data) {
            setCategories(data.layout.categories);
        }
    }, [data]);

    // useEffect(() => {
    //     form.setValue("slug", generateSlug(form.getValues("name")));
    // }, [form.getValues("name")]);

    const generateSlug = (title: string) => {
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");

        return slug;
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const title = event.target.value;
        form.setValue("name", title);
        form.setValue("slug", generateSlug(title));
    };


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

    const onSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (form.getValues("name") === "" || form.getValues("description") === "" || form.getValues("price") === "" || form.getValues("tags") === "" || form.getValues("category") === "" || form.getValues("level") === "" || form.getValues("demoUrl") === "" || form.getValues("thumbnail") === "") {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "Please fill all the required fields"
            })
            console.error("Please fill all the fields");
        }
        else {
            setActive(active + 1);
        }
    }

    return (
        <div className='w-[90%] mx-auto mt-16 md:mt-24'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                                    onChange={handleNameChange}
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
                            name='slug'
                            render={({ field }) => (
                                <CustomInput
                                    label='Course Slug'
                                    name={field.name}
                                    value={field.value}
                                    placeholder='nextJs-lms-platform-with-next-14'
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
                                                {Object.values(Level).map((level) => (
                                                    <SelectItem key={level} value={level}>
                                                        {level}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className='mb-5 space-y-4'>
                        {/* <div className='825:w-[45%] w-full mb-5'> */}
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
                        {/* </div>
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
                         </div> */}
                    </div>
                    <div className='w-full mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            onChange={field.onChange}
                                            value={field.value}
                                            onRemove={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
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
                        // onClick={handleSubmit}
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