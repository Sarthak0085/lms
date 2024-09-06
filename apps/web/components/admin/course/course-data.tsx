"use client"

import { CourseRequirementsSchema, CreateCourseSchema, EditCourseSchema } from '@/schemas';
import React, { MouseEvent, SetStateAction } from 'react'
import * as z from "zod";
import { useFieldArray, useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormMessage, Input, Label } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { RiAddCircleLine, RxArrowLeft, RxArrowRight, RxCross1 } from '@repo/ui/icon';
import { zodResolver } from '@hookform/resolvers/zod';

type formSchema = z.infer<typeof CreateCourseSchema> | z.infer<typeof EditCourseSchema>;

interface CourseDataProps {
    courseData: formSchema;
    setCourseData: React.Dispatch<SetStateAction<formSchema>>
    setActive: React.Dispatch<SetStateAction<number>>;
    isPending: boolean;
}

export const CourseData = ({ courseData, setCourseData, setActive, isPending }: CourseDataProps) => {
    const form = useForm<z.infer<typeof CourseRequirementsSchema>>({
        resolver: zodResolver(CourseRequirementsSchema),
        defaultValues: {
            benefits: courseData?.benefits.map(benefit => ({ title: benefit.title })) ?? [{ title: "" }],
            prerequisites: courseData?.prerequisites.map(prerequisite => ({ title: prerequisite.title })) ?? [{ title: "" }],
        }
    });
    const { fields: benefitsFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control: form.control,
        name: 'benefits'
    });
    const { fields: prerequisitesFields, append: appendPrerequisite, remove: removePrerequisite } = useFieldArray({
        control: form.control,
        name: 'prerequisites'
    });
    const handleAddBenefit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        appendBenefit({ title: "" });
    };
    const handleRemoveBenefit = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        removeBenefit(index);
    };
    const handleAddPrerequisite = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        appendPrerequisite({ title: "" });
    };
    const handleRemovePrerequisite = (e: MouseEvent<HTMLButtonElement>, index: number) => {
        e.preventDefault();
        removePrerequisite(index);
    };
    const handleBenefitChange = (index: number, value: string) => {
        form.setValue(`benefits.${index}.title`, value);
    };
    const handlePrerequisiteChange = (index: number, value: string) => {
        form.setValue(`prerequisites.${index}.title`, value);
    };
    const onSubmit = (values: z.infer<typeof CourseRequirementsSchema>) => {
        setCourseData(prev => ({
            ...prev,
            benefits: values?.benefits,
            prerequisites: values?.prerequisites,
        }));
        setActive(prev => prev + 1);
    }

    return (
        <div className='w-[90%] mx-auto mt-16 md:mt-24'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='mb-5'>
                        <Label className='font-bold text-[16px]'>What are the benefits for students in this course?</Label>
                        {benefitsFields.map((benefit, index) => (
                            <div key={benefit?.id ?? index} className='my-4'>
                                <FormField
                                    control={form.control}
                                    name={`benefits.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl key={benefit?.id || index}>
                                                <div className='relative'>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        placeholder="You will be able to build LMS platform"
                                                        disabled={isPending}
                                                        className='!outline-none !border-none focus:!outline-none focus-visible:!ring-0 focus-visible:!outline-none pl-6 pr-10'
                                                        onChange={(e) => handleBenefitChange(index, e.target.value)}
                                                    />
                                                    <Button
                                                        variant={"icon"}
                                                        size={"icon"}
                                                        disabled={isPending}
                                                        className={cn(" absolute right-0 top-0", isPending && "cursor-not-allowed")}
                                                        onClick={(e) => handleRemoveBenefit(e, index)}
                                                    >
                                                        <RxCross1
                                                            size={16}
                                                            className='dark:text-white text-black'
                                                        />
                                                        <span className='sr-only'>Remove Benefit</span>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <Button
                            variant={"icon"}
                            size={"icon"}
                            disabled={isPending}
                            className={cn("!block", isPending && "cursor-not-allowed")}
                            onClick={(e) => handleAddBenefit(e)}
                        >
                            <RiAddCircleLine size={20} className="dark:text-white text-black cursor-pointer animate-pulse" />
                            <span className='sr-only'>Add New Benefit</span>
                        </Button>
                    </div>
                    <div className='mb-5'>
                        <Label className='font-bold text-[16px]'>What are the prerequisites for students in this course?</Label>
                        {prerequisitesFields.map((prerequisite, index) => (
                            <div key={prerequisite?.id ?? index} className='my-4'>
                                <FormField
                                    control={form.control}
                                    name={`prerequisites.${index}.title`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl key={prerequisite?.id || index}>
                                                <div className='relative'>
                                                    <Input
                                                        type="text"
                                                        {...field}
                                                        placeholder="You will be able to build LMS platform"
                                                        disabled={isPending}
                                                        className='!outline-none !border-none focus:!outline-none focus-visible:!ring-0 focus-visible:!outline-none pl-6 pr-10'
                                                        onChange={(e) => handlePrerequisiteChange(index, e.target.value)}
                                                    />
                                                    <Button
                                                        variant={"icon"}
                                                        size={"icon"}
                                                        disabled={isPending}
                                                        className={cn(" absolute right-0 top-0", isPending && "cursor-not-allowed")}
                                                        onClick={(e) => handleRemovePrerequisite(e, index)}
                                                    >
                                                        <RxCross1
                                                            size={16}
                                                            className='dark:text-white text-black cursor-pointer'
                                                        />
                                                        <span className='sr-only'>Remove Prerequisite</span>
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <Button
                            variant={"icon"}
                            size={"icon"}
                            disabled={isPending}
                            className={cn("!block", isPending && "cursor-not-allowed")}
                            onClick={(e) => handleAddPrerequisite(e)}
                        >
                            <RiAddCircleLine size={22} className="dark:text-white text-black cursor-pointer mb-8 mt-5 animate-pulse" />
                            <span className='sr-only'>Add New Prerequisite</span>
                        </Button>
                    </div>
                    <div className='w-full my-4 mt-12 flex justify-between' >
                        <Button
                            variant={"primary"}
                            className={cn(isPending && "cursor-not-allowed")}
                            onClick={() => setActive(prev => prev - 1)}
                        >
                            <RxArrowLeft size={20} className="me-2" /> Prev
                        </Button>
                        <Button
                            variant={"primary"}
                            className={cn(isPending && "cursor-not-allowed")}
                            type="submit"
                        >
                            Next <RxArrowRight size={20} className="ms-2" />
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
};