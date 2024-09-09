"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
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
import { Course } from "@repo/db/types"
import { TrashIcon } from "@repo/ui/icon"
import { Icons } from "@/components/icons"
import { deleteCategories } from "@/actions/category/delete-category"

interface DeleteCoursesDialogProps
    extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
    courses: Row<Course>["original"][]
    showTrigger?: boolean
    onSuccess?: () => void
}

export const DeleteCoursesDialog = ({
    courses,
    showTrigger = true,
    onSuccess,
    ...props
}: DeleteCoursesDialogProps) => {
    const [isPending, startTransition] = React.useTransition()

    const onDelete = () => {
        startTransition(async () => {
            deleteCategories({
                ids: courses.map((course) => course.id),
            }).then((data) => {
                if (data.error) {
                    toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: data.error,
                    });
                }

                if (data.success) {
                    props?.onOpenChange?.(false)
                    toast({
                        variant: "success",
                        title: "Success!!",
                        description: data?.success,
                    });
                    onSuccess?.()
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
        <AlertDialog {...props}>
            {showTrigger ? (
                <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete ({courses.length})
                    </Button>
                </AlertDialogTrigger>
            ) : null}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your{" "}
                        <span className="font-medium">{courses.length}</span>
                        {courses.length === 1 ? " course" : " courses"} from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2 sm:space-x-0">
                    <AlertDialogCancel asChild>
                        <Button variant="outline">Cancel</Button>
                    </AlertDialogCancel>
                    <Button
                        aria-label="Delete selected rows"
                        variant="destructive"
                        onClick={onDelete}
                        disabled={isPending}
                    >
                        {isPending && (
                            <Icons.spinner
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