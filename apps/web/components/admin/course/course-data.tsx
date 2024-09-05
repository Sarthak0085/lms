"use client"

import { CreateCourseSchema, EditCourseSchema } from '@/schemas';
import React, { MouseEvent, SetStateAction } from 'react'
import * as z from "zod";
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input } from '@repo/ui';
import { cn } from '@repo/ui/lib/utils';
import { RiAddCircleLine, RxArrowLeft, RxArrowRight, RxCross1 } from '@repo/ui/icon';

type formSchema = typeof CreateCourseSchema | typeof EditCourseSchema;

interface CourseDataProps {
    form: ReturnType<typeof useForm<z.infer<formSchema>>>
    active: number;
    setActive: React.Dispatch<SetStateAction<number>>;
    isPending: boolean;
}

export const CourseData = ({ form, active, setActive, isPending }: CourseDataProps) => {
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
    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const areBenefitsValid = form.getValues("benefits").every(b => b.title.trim() !== "");
        const arePrerequisitesValid = form.getValues("prerequisites").every(p => p.title.trim() !== "");
        if (areBenefitsValid && arePrerequisitesValid) {
            setActive(active + 1);
        } else {
            console.error("Please fill atleast one benefit and prerequisite field")
            // toast.error("Please fill the fields for go to next");
        }
    }

    return (
        <div className='w-[90%] mx-auto mt-16 md:mt-24'>
            <Form {...form}>
                <form>
                    <div className='mb-5'>
                        <FormField
                            control={form.control}
                            name='benefits'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>What are the benefits for students in this course?</FormLabel>
                                    {benefitsFields.map((benefit, index) => (
                                        <FormControl key={benefit?.id || index}>
                                            <Controller
                                                name={`benefits.${index}.title`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <div className='relative'>
                                                        <Input
                                                            type="text"
                                                            {...field}
                                                            placeholder="You will be able to build LMS platform"
                                                            disabled={isPending}
                                                            className='!outline-none !border-none focus:!outline-none focus-visible:!ring-0 focus-visible:!outline-none'
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
                                                )}
                                            />
                                        </FormControl>
                                    ))}
                                    <FormMessage />
                                    <Button
                                        variant={"icon"}
                                        size={"icon"}
                                        disabled={isPending}
                                        className={cn("!block", isPending && "cursor-not-allowed")}
                                        onClick={(e) => handleAddBenefit(e)}
                                    >
                                        <RiAddCircleLine size={20} className="dark:text-white text-black cursor-pointer" />
                                        <span className='sr-only'>Add New Benefit</span>
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='mb-5'>
                        <FormField
                            control={form.control}
                            name='prerequisites'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel> What are the prerequisites  for students in this course?</FormLabel>
                                    {prerequisitesFields.map((prerequisite, index) => (
                                        <FormControl key={prerequisite?.id || index}>
                                            <Controller
                                                name={`prerequisites.${index}.title`}
                                                control={form.control}
                                                render={({ field }) => (
                                                    <div className='relative'>
                                                        <Input
                                                            type="text"
                                                            {...field}
                                                            placeholder="You will be able to build LMS platform"
                                                            disabled={isPending}
                                                            className='!outline-none !border-none focus:!outline-none focus-visible:!ring-0 focus-visible:!outline-none'
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
                                                )}
                                            />
                                        </FormControl>
                                    ))}
                                    <FormMessage />
                                    <Button
                                        variant={"icon"}
                                        size={"icon"}
                                        disabled={isPending}
                                        className={cn("!block", isPending && "cursor-not-allowed")}
                                        onClick={(e) => handleAddPrerequisite(e)}
                                    >
                                        <RiAddCircleLine size={20} className="dark:text-white text-black cursor-pointer mb-8 mt-5" />
                                        <span className='sr-only'>Add New Prerequisite</span>
                                    </Button>
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='w-full flex justify-between' >
                        <Button
                            variant={"primary"}
                            className={cn(isPending && "cursor-not-allowed")}
                            onClick={() => setActive(active - 1)}
                        >
                            <RxArrowLeft size={20} className="me-2" /> Prev
                        </Button>
                        <Button
                            variant={"primary"}
                            className={cn(isPending && "cursor-not-allowed")}
                            onClick={handleSubmit}
                        >
                            Next <RxArrowRight size={20} className="ms-2" />
                        </Button>
                    </div>

                </form>
            </Form>
        </div>
    )
};