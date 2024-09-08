"use client";

import { Content, ContentType } from "@repo/db/types";
import { SectionDialog } from "./section-dialog";
import { Button, toast } from "@repo/ui";
import Link from "next/link";
import { RxArrowLeft } from "@repo/ui/icon";
import { SectionList } from "./section-lists";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { deleteSection } from "@/actions/sections/delete-section";

interface CourseSectionsProps {
    courseId: string;
    sections: Content[]
}

export const CourseSections = ({
    courseId,
    sections
}: CourseSectionsProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [openSectionDialog, setOpenSectionDialog] = useState(false);
    const [selectedSection, setSelectedSection] = useState<Content | null>(null);

    const onReorder = async (updateData: { id: string; position: number }[]) => {
        try {
            const response = await fetch(`/api/admin/course/${courseId}/sections/reorder`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    list: updateData,
                }),
            });

            if (!response?.ok) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with reordering the course section.",
                });
            }

            toast({
                variant: "success",
                title: "Success!!",
                description: "Sections reorder successfully"
            });
        } catch (err) {
            console.log("Failed to reorder sections", err);
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with reordering the course section.",
            });
        }
    };

    const removeSection = (id: string, parentId?: string | null) => {
        startTransition(() => {
            deleteSection(courseId, id, parentId!)
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
                            description: data?.success
                        });
                    }
                }).catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with creating the course section.",
                    });
                })
        })
    };

    const handleEdit = (id: string) => {
        const sectionToEdit = sections.find(section => section.id === id) || null;
        setSelectedSection(sectionToEdit);
        console.log(sectionToEdit);
        setOpenSectionDialog(true);
    };

    return (
        <div className="px-10 py-6">
            <div className="w-full flex items-center justify-between">
                <Button variant={"primary"} asChild>
                    <Link href={"/admin/courses"}>
                        <RxArrowLeft size={20} className="me-2" /> Back to Courses
                    </Link>
                </Button>
                <SectionDialog
                    open={openSectionDialog}
                    setOpen={setOpenSectionDialog}
                    section={selectedSection}
                    courseId={courseId}
                    sectionLength={sections?.filter(section => section.type === ContentType.FOLDER).length}
                />
            </div>
            <div className="my-10">
                <SectionList
                    items={sections || []}
                    onReorder={onReorder}
                    courseId={courseId}
                    isPending={isPending}
                    deleteSection={removeSection}
                    handleFolderEdit={handleEdit}
                />
            </div>
        </div>
    );
};
