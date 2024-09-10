"use client";

import { useState } from 'react';
import { Button } from "@repo/ui";
import { AiOutlineDelete, ChevronDown, PlusCircledIcon, RxArrowLeft } from "@repo/ui/icon";
import { SectionForm } from './section-form';
import { cn } from '@repo/ui/lib/utils';
import Link from 'next/link';
import { ExtendContent } from '@/types';
import { DeleteSectionDialog } from './delete-section-dialog';

interface SectionManagerProps {
    courseId: string;
    sectionId: string;
    data: ExtendContent[];
}

export const SectionManager = ({ courseId, sectionId, data }: SectionManagerProps) => {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [deleteData, setDeleteData] = useState<{ id?: string, parentId?: string | null }>();
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
            acc[section.id] = false;
            return acc;
        }, {} as { [key: string]: boolean })
    )

    const addNewSection = () => {
        setSections((prevSections) => [
            ...prevSections,
            { id: `Section-${sectionId}-${prevSections.length + 1}`, index: prevSections.length, data: null }
        ]);
    };

    const removeSection = (id: string, parentId?: string | null, section?: { id: string, index: number, data: ExtendContent | null }) => {
        if (section?.data === null) {
            setSections((prevSections) => prevSections.filter(section => section.id !== id));
        }
        else {
            setDeleteData({ id: section?.id, parentId: parentId });
            setTimeout(() => {
                setOpenDeleteDialog(true);
            }, 500);
        }
    };

    const toggleCollapse = (id: string) => {
        setOpen((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    };

    return (
        <>
            {
                openDeleteDialog &&
                <DeleteSectionDialog
                    open={openDeleteDialog}
                    setOpen={setOpenDeleteDialog}
                    courseId={courseId}
                    id={deleteData?.id as string}
                    parentId={deleteData?.parentId}
                />
            }
            <div className='w-full mx-auto mt-16'>
                <div className="flex justify-between items-center mb-4">
                    <Button
                        variant={"primary"}
                        asChild
                    >
                        <Link href={`/admin/course/${courseId}/sections`}>
                            <RxArrowLeft size={20} className="me-2" /> Back to Sections List
                        </Link>
                    </Button>
                    <Button
                        variant="primary"
                        className="ml-auto !justify-end"
                        onClick={addNewSection}
                    >
                        <PlusCircledIcon className="mr-2 size-4" />
                        Add New Section
                    </Button>
                </div>
                <h2 className="flex items-center justify-center text-2xl font-bold mb-4 logo-style">Section Details</h2>
                {sections.slice().reverse().map((section, index) => (
                    <div key={section.id} className='mb-8 py-6'>
                        {open[section?.id] &&
                            <SectionForm
                                sectionId={sectionId}
                                section={section?.data}
                                courseId={courseId}
                                sectionLength={sections.length}
                            />
                        }
                        <div className={cn("w-full flex items-center justify-between mt-1 mb-3 px-4 py-2 rounded-lg", !open[section?.id] && "border border-slate-500")}>
                            {!open[section?.id] && (
                                <p className="font-Poppins mt-2 text-[18px] text-black dark:text-white">
                                    {sections.length - index}. {section?.data?.title ?? "Untitled Section"}
                                </p>
                            )}
                            {
                                <div className="flex gap-4 items-center">
                                    <Button
                                        variant="icon"
                                        className="!p-0 h-auto"
                                        onClick={() => removeSection(section.id, section?.data?.parentId, section)}
                                    >
                                        <AiOutlineDelete className='size-5 text-red-500' />
                                        <span className="sr-only">Delete Section</span>
                                    </Button>
                                    <Button
                                        variant="icon"
                                        className="!p-0 h-auto"
                                        onClick={() => toggleCollapse(section.id)}
                                    >
                                        <ChevronDown className={cn("size-5 rotate-180", open[section?.id] && "rotate-0")} />
                                        <span className="sr-only">Toggle Section</span>
                                    </Button>
                                </div>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};