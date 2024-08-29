import { CustomInput } from "@/components/custom-input";
import { CreateCourseSchema } from "@/schemas";
import { Button, FormField, Label } from "@repo/ui";
import { AiOutlineDelete, BsLink45Deg, ChevronDown } from "@repo/ui/icon";
import { cn } from "@repo/ui/lib/utils";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

interface CourseContentLinksProps {
    form: ReturnType<typeof useForm<z.infer<typeof CreateCourseSchema>>>;
    sectionIndex: number;
    isPending: boolean;
}

export const CourseContentLinks = ({
    form,
    sectionIndex,
    isPending
}: CourseContentLinksProps) => {
    const { fields: links, append: appendLink, remove: removeLink } = useFieldArray({
        control: form.control,
        name: `courseContentData.${sectionIndex}.links`,
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
                            {/* <ChevronDown
                                fontSize="large"
                                className="text-black cursor-pointer dark:text-white"
                                style={{
                                    transform: isCollapsed[linkIndex]
                                        ? "rotate(180deg)"
                                        : "rotate(0deg)",
                                }}
                                onClick={() => handleCollapseLinkToggle(linkIndex)}
                            /> */}

                            <Button
                                variant={"icon"}
                                size={"icon"}
                                onClick={() => handleCollapseLinkToggle(linkIndex)}
                                className={cn("!w-auto !h-auto")}
                            >
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
                                />
                                <span className="sr-only">Toggle Link</span>
                            </Button>
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
                                name={`courseContentData.${sectionIndex}.links.${linkIndex}.title`}
                                render={({ field }) => (
                                    <CustomInput
                                        label="Source code title"
                                        name={field.name}
                                        value={field.value}
                                        placeholder="Source Code Title..."
                                        type="text"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                    />
                                )}
                            />
                        </div>
                        <div className="mb-3">
                            <FormField
                                control={form.control}
                                name={`courseContentData.${sectionIndex}.links.${linkIndex}.url`}
                                render={({ field }) => (
                                    <CustomInput
                                        label="Source code URL"
                                        name={field.name}
                                        value={field.value}
                                        placeholder="Source Code Url (Link URL)...."
                                        type="url"
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        isPending={isPending}
                                    />
                                )}
                            />
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