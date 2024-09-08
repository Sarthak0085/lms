"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Button,
    toast
} from "@repo/ui"
import { ReloadIcon, TrashIcon } from "@repo/ui/icon"
import { Icons } from "@/components/icons"
import { deleteSection } from "@/actions/sections/delete-section"

interface DeleteSectionDialogProps {
    courseId: string;
    id: string;
    parentId?: string | null;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteSectionDialog = ({
    courseId,
    id,
    parentId,
    open,
    setOpen
}: DeleteSectionDialogProps) => {
    console.log(courseId, id, parentId);
    const [isPending, startTransition] = React.useTransition()

    const onDelete = () => {
        startTransition(async () => {
            deleteSection(courseId, id, parentId!).then((data) => {
                if (data.error) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: data.error,
                    });
                }

                if (data.success) {
                    setOpen(false);
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
                    description: "There was a problem with deleting the category.",
                });
            })
        })
    }

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger onClick={() => setOpen(true)} />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this
                        <span className="font-medium">{" section "}</span>
                        from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="pt-4 gap-2 sm:space-x-0">
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isPending}
                        className="mt-2"
                    >
                        {isPending && (
                            <ReloadIcon
                                className="mr-2 size-4 animate-spin"
                                aria-hidden="true"
                            />
                        )}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
};