import { CustomInput } from "@/components/custom-input";
import FileUpload from "@/components/file-upload";
import { SectionContentSchema } from "@/schemas";
import { Button, FormControl, FormField, FormItem, FormLabel, FormMessage, Label } from "@repo/ui";
import { AiOutlineDelete, BsLink45Deg, ChevronDown } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

interface SectionContentLinksProps {
    form: ReturnType<typeof useForm<z.infer<typeof SectionContentSchema>>>;
    sectionIndex?: number;
    isPending: boolean;
}

export const SectionContentLinks = ({
    form,
    sectionIndex,
    isPending
}: SectionContentLinksProps) => {
    const { fields: links, append: appendLink, remove: removeLink } = useFieldArray({
        control: form.control,
        name: `links`,
    });

    const [isCollapsed, setIsCollapsed] = useState(
        Array(links?.length).fill(false)
    );

    const handleCollapseLinkToggle = (index: number) => {
        console.log(index);

        const updatedCollapse = [...isCollapsed];
        updatedCollapse[index] = !updatedCollapse[index];
        console.log(updatedCollapse[index]);

        setIsCollapsed(updatedCollapse);
    };

    return (
        <div className="mb-3">
            {links.map((link, linkIndex) => (
                <div key={linkIndex || link.url} className="mb-3 block">
                    <div className="w-full flex items-center mb-4 justify-between">
                        <Label className="!text-[18px]">Link {linkIndex + 1}.</Label>
                        <div className="gap-4 flex">
                            <ChevronDown
                                fontSize="large"
                                className={cn("text-black dark:text-white",
                                    isPending ? 'cursor-not-allowed' : 'cursor-pointer'
                                )}
                                style={{
                                    transform: isCollapsed[linkIndex]
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                                }}
                                aria-label="Toggle Link"
                                onClick={() => handleCollapseLinkToggle(linkIndex)}
                            />
                            <Button
                                variant={"icon"}
                                size={"icon"}
                                onClick={() => removeLink(linkIndex)}
                                className={cn("!w-auto !h-auto", linkIndex === 0 && "cursor-no-drop")}
                                disabled={isPending || linkIndex === 0}
                            >
                                <AiOutlineDelete
                                    size={20}
                                    className={cn(`dark:text-white text-black`,
                                        isPending || linkIndex === 0 ? 'cursor-no-drop' : 'cursor-pointer')}
                                />
                                <span className="sr-only">Remove Link</span>
                            </Button>
                        </div>
                    </div>
                    {!isCollapsed[linkIndex] && <>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name={`links.${linkIndex}.title`}
                                render={({ field }) => (
                                    <CustomInput
                                        label="Link title"
                                        name={field.name}
                                        value={field.value}
                                        placeholder="Reading Material"
                                        type="text"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <div className="mb-3">
                                <FormField
                                    control={form.control}
                                    name={`links.${linkIndex}.url`}
                                    render={({ field }) => (
                                        <CustomInput
                                            label="Asset URL (url must from cloudinary or uploadthing service)"
                                            name={field.name}
                                            value={field.value}
                                            placeholder="fshswuei3evg434"
                                            type="url"
                                            onChange={field.onChange}
                                            onBlur={field.onBlur}
                                            isPending={isPending}
                                        />
                                    )}
                                />
                            </div>
                            <div className="w-full flex items-center mb-5 px-3">
                                <div className="flex-grow border-t border-gray-300"></div>
                                <span className="mx-2 text-gray-600 dark:text-gray-100 text-sm">OR</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>
                            <div className='w-full mb-3 space-y-4'>
                                <FormField
                                    control={form.control}
                                    name={`links.${linkIndex}.url`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Asset File</FormLabel>
                                            <FormControl>
                                                <FileUpload
                                                    value={field.value || ""}
                                                    onChange={(url) => field.onChange(url)}
                                                    onRemove={field.onChange}
                                                    maxSize={4}
                                                    endpoint='SectionImage'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </>}
                </div>
            ))}
            <div className="inline-block mb-4">
                <Button
                    variant="outline"
                    onClick={() => appendLink({ title: '', url: '' })}
                >
                    <BsLink45Deg className="me-1" /> Add Link
                </Button>
            </div>
        </div>
    );
};