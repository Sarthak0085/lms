"use client";

import { CustomInput } from "@/components/custom-input";
import FileUpload from "@/components/file-upload";
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
    Switch
} from "@repo/ui";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionContentLinks } from "./section-content-links";
import { cn } from "@repo/ui/lib/utils";
import { ReloadIcon } from "@repo/ui/icon";

interface SectionFormProps {
    sectionId: string;
    courseId: string;
    sectionLength: number;
}

export const SectionForm = ({
    sectionId,
    courseId,
    sectionLength
}: SectionFormProps) => {
    const [isPending, startTransition] = useTransition();
    const form = useForm<z.infer<typeof SectionContentSchema>>({
        resolver: zodResolver(SectionContentSchema),
        defaultValues: {
            title: "",
            description: "",
            notionMetadataId: "",
            videoUrl: "",
            thumbnail: "",
            parentId: sectionId,
            courseId: courseId,
            type: undefined,
            hidden: false,
            position: sectionLength ?? 0,
            links: [{ title: "", url: "" }]
        }
    });

    const onSubmit = () => { }

    return (
        <div className='w-[90%] mx-auto mt-16 md:mt-24'>
            <h2 className="flex items-center justify-center text-2xl font-bold mb-4 logo-style">Create Sections</h2>
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
                                    required={true}
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
                                            <FileUpload
                                                value={field.value || ""}
                                                onChange={(url) => field.onChange(url)}
                                                onRemove={field.onChange}
                                                maxSize={4}
                                                endpoint='SectionVideo'
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
                                        <FileUpload
                                            value={field.value || ""}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={field.onChange}
                                            maxSize={4}
                                            endpoint='imageUploader'
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
                    {/* <div className='mb-5 space-y-4'>
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
                    </div> */}
                    {/* <div className='w-full 825:mb-5 825:flex justify-between'>
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

                    </div>
                    <div className='mb-5 space-y-4'>
                        {/* <div className='825:w-[45%] w-full mb-5'> */}
                    {/* <FormField
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
                    /> */}
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
                    {/* </div>
                    <div className='w-full mb-5 space-y-4'>
                        <FormField
                            control={form.control}
                            name="thumbnail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Thumbnail</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            value={field.value || ""}
                                            onChange={(url) => field.onChange(url)}
                                            onRemove={field.onChange}
                                            maxSize={4}
                                            endpoint='Image'
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
                    </div>  */}
                    <br />
                    <div className='w-full flex items-center justify-end relative '>
                        <Button
                            variant={"primary"}
                            type='submit'
                            disabled={isPending}
                            className={cn(isPending && "cursor-not-allowed")}
                        // onClick={handleSubmit}
                        >
                            {isPending && (
                                <ReloadIcon
                                    className="mr-2 size-4 animate-spin"
                                    aria-hidden="true"
                                />
                            )}
                            Create
                        </Button>
                    </div>
                    <br />
                    <br />
                </form>
            </Form>
        </div>
    )
}