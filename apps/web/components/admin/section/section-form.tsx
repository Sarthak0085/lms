"use client";

import { CustomInput } from "@/components/custom-input";
import { ImageUpload, VideoFileUpload } from "@/components/file-upload";
import { SectionContentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentType } from "@repo/db/types";
import {
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Switch,
    toast
} from "@repo/ui";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionContentLinks } from "./section-content-links";
import { cn } from "@repo/ui/lib/utils";
import { ReloadIcon } from "@repo/ui/icon";
import { ExtendContent } from "@/types";
import { createSection } from "@/actions/sections/create-section";

interface SectionFormProps {
    sectionId: string;
    courseId: string;
    sectionLength: number;
    section: ExtendContent | null;
}

export const SectionForm = ({
    sectionId,
    courseId,
    section,
    sectionLength
}: SectionFormProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SectionContentSchema>>({
        resolver: zodResolver(SectionContentSchema),
        defaultValues: {
            id: section?.id ?? "",
            title: section?.title ?? "",
            description: section?.description ?? "",
            notionMetadataId: String(section?.notionMetadataId) ?? "",
            videoUrl: section?.videoUrl ?? "",
            thumbnail: section?.thumbnail ?? "",
            parentId: sectionId,
            courseId: courseId,
            type: section?.type as Exclude<ContentType, "FOLDER"> ?? undefined,
            hidden: section?.hidden ?? false,
            position: (section?.position ?? sectionLength) || 0,
            links: section?.links?.map(link => ({ title: link?.title, url: link?.url })) ?? [{ title: "", url: "" }]
        }
    });
    console.log(form.getValues("parentId"), form.getValues("id"))

    const onSubmit = (values: z.infer<typeof SectionContentSchema>) => {
        startTransition(() => {
            createSection(values)
                .then((data) => {
                    if (data?.error) {
                        toast({
                            variant: "destructive",
                            title: "Uh oh! Something went wrong.",
                            description: data?.error,
                        });
                    }
                    if (data?.success) {
                        toast({
                            variant: "success",
                            title: "Success!!",
                            description: data?.success,
                        });
                    }
                }).catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with creating the Child section.",
                    });
                })
        })
    }

    return (
        <div className='w-[90%] mx-auto mt-10'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name='title'
                            render={({ field }) => (
                                <CustomInput
                                    label='Section Title'
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
                                    rows={8}
                                />
                            )}
                        />
                    </div>
                    <div className='w-full mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name='type'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content Type <span className='text-[crimson] ms-1'>*</span></FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a Type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(ContentType).filter(type => type !== ContentType.FOLDER).map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {form.getValues("type") === ContentType.VIDEO &&
                        <div className='w-full mb-5 space-y-4'>
                            <FormField
                                control={form.control}
                                name="videoUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Video</FormLabel>
                                        <FormControl>
                                            <VideoFileUpload
                                                value={field.value || ""}
                                                onChange={(url) => field.onChange(url)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    }
                    {form.getValues("type") === ContentType.NOTION &&
                        <div className='mb-5 space-y-4'>
                            <FormField
                                control={form.control}
                                name='notionMetadataId'
                                render={({ field }) => (
                                    <CustomInput
                                        label='Notion Link'
                                        name={field.name}
                                        value={field.value}
                                        placeholder='nsdhfdte37fdhshd'
                                        type="text"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                        required={true}
                                    />
                                )}
                            />
                        </div>
                    }
                    <div className='w-full mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <ImageUpload
                                            value={field.value || ""}
                                            onChange={(url) => field.onChange(url)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <SectionContentLinks form={form} isPending={isPending} />
                    <div className="mb-5 space-y-4">
                        <FormField
                            control={form.control}
                            name="hidden"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Accessibility</FormLabel>
                                        <FormDescription>
                                            This section must be hidden
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                    <br />
                    <div className='w-full flex items-center justify-end relative '>
                        <Button
                            variant={"primary"}
                            type='submit'
                            disabled={isPending}
                            className={cn(isPending && "cursor-not-allowed")}
                        >
                            {isPending && (
                                <ReloadIcon
                                    className="mr-2 size-4 animate-spin"
                                />
                            )}
                            Save
                        </Button>
                    </div>
                    <br />
                    <br />
                </form>
            </Form>
        </div>
    )
}