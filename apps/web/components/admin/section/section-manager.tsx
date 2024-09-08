"use client";

import { useState } from 'react';
import { Button } from "@repo/ui";
import { AiOutlineDelete, ChevronDown, PlusCircledIcon, RxArrowLeft } from "@repo/ui/icon";
import { SectionForm } from './section-form';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { ExtendContent } from '@/types';

interface SectionManagerProps {
    courseId: string;
    sectionId: string;
    data: ExtendContent[];
}

export const SectionManager = ({ courseId, sectionId, data }: SectionManagerProps) => {
    const [sections, setSections] = useState<{ id: string, index: number, data: ExtendContent | null }[]>(
        data.map((section) => (
            {
                id: section?.id,
                index: section?.position,
                data: section
            }
        ))
    );
    const [open, setOpen] = useState<{ [key: string]: boolean }>(
        data.reduce((acc, section) => {
            acc[section.id] = true;
            return acc;
        }, {} as { [key: string]: boolean })
    )

    const addNewSection = () => {
        setSections((prevSections) => [
            ...prevSections,
            { id: `Section-${sectionId}-${prevSections.length + 1}`, index: prevSections.length, data: null }
        ]);
    };

    const removeSection = (id: string) => {
        setSections((prevSections) => prevSections.filter(section => section.id !== id));
    };

    const toggleCollapse = (id: string) => {
        setOpen((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    };

    return (
        <div className='w-full mx-auto mt-16'>
            <div className="flex justify-between items-center mb-4">
                <Button variant={"primary"} asChild>
                    <Link href={`/admin/course/${courseId}/sections`}>
                        <RxArrowLeft size={20} className="me-2" /> Back to Sections List
                    </Link>
                </Button>
                <Button variant="primary" className="ml-auto !justify-end" onClick={addNewSection}>
                    <PlusCircledIcon className="mr-2 size-4" />
                    Add New Section
                </Button>
            </div>
            <h2 className="flex items-center justify-center text-2xl font-bold mb-4 logo-style">Sections</h2>


            {sections.map((section, index) => (
                <div key={section.id} className='mb-8 py-6'>
                    <div className="w-full flex items-center justify-between mt-1 mb-3">
                        {!open[section?.id] && (
                            // form.getValues(`courseContentData.${index}.title`) && (
                            <p className="font-Poppins mt-2 text-[18px] text-black dark:text-white">
                                {index + 1}. {section?.data?.title ?? "Untitled Section"}
                            </p>
                            // )
                        )}
                        {
                            <div className="flex mt-3 items-center">
                                <Button
                                    variant="icon"
                                    className="!p-0 h-auto"
                                    onClick={() => removeSection(section.id)}
                                >
                                    <AiOutlineDelete className='size-5 text-red-500' />
                                    <span className="sr-only">Delete Section</span>
                                </Button>
                                {/* <AiOutlineDelete
                                    className={cn("text-[20px] mr-2 text-black dark:text-white",
                                        index > 0 ? "cursor-pointer" : "cursor-no-drop")}
                                    onClick={() => handleRemoveSection(index)}
                                /> */}
                                <Button
                                    variant="icon"
                                    className="!p-0 h-auto"
                                    onClick={() => toggleCollapse(section.id)}
                                >
                                    <ChevronDown className={cn("h-5 w-5 rotate-180", open[section?.id] && "rotate-0")} />
                                    <span className="sr-only">Toggle Section</span>
                                </Button>
                            </div>
                        }
                    </div>
                    {/* <div className='flex items-center justify-between mb-4'>
                        <Button
                            variant="icon"
                            className="!p-0 h-auto"
                            onClick={() => toggleCollapse(section.id)}
                        >
                            <ChevronDown className={cn("h-5 w-5 rotate-180", open[section?.id] && "rotate-0")} />
                        </Button>
                        <Button
                            variant="icon"
                            className="!p-0 h-auto"
                            onClick={() => removeSection(section.id)}
                        >
                            <span className="text-red-600">Delete</span>
                        </Button>
                    </div> */}
                    {open[section?.id] &&
                        <SectionForm
                            sectionId={section.id}
                            section={section?.data}
                            courseId={courseId}
                            sectionLength={sections.length}
                        />
                    }
                </div>
            ))}
        </div>
    );
};