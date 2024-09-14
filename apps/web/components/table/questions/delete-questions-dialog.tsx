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
import { Question } from "@repo/db/types"
import { ReloadIcon, TrashIcon } from "@repo/ui/icon"
import { Icons } from "@/components/icons"
import { deleteQuestions } from "@/actions/questions/delete-questions"

interface DeleteQuestionsDialogProps
    extends React.ComponentPropsWithoutRef<typeof AlertDialog> {
    questions: Row<Question>["original"][]
    showTrigger?: boolean
    onSuccess?: () => void
}

export const DeleteQuestionsDialog = ({
    questions,
    showTrigger = true,
    onSuccess,
    ...props
}: DeleteQuestionsDialogProps) => {
    const [isPending, startTransition] = React.useTransition()

    const onDelete = () => {
        startTransition(async () => {
            deleteQuestions({
                ids: questions.map((question) => question.id),
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
                    description: "There was a problem with deleting the question.",
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
                        Delete ({questions.length})
                    </Button>
                </AlertDialogTrigger>
            ) : null}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete {" "}
                        <span className="font-medium">{questions.length}</span>
                        {questions.length === 1 ? " question" : " questions"} from our servers.
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