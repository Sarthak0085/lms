"use client"

import * as React from "react"
import { type Row } from "@tanstack/react-table"
import { Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, toast } from "@repo/ui"
import { User } from "@repo/db/types"
import { ReloadIcon, TrashIcon } from "@repo/ui/icon"
import { Icons } from "@/components/icons"
import { deleteUsers } from "@/actions/user/delete-user"


interface DeleteUsersDialogProps
    extends React.ComponentPropsWithoutRef<typeof Dialog> {
    users: Row<User>["original"][]
    showTrigger?: boolean
    onSuccess?: () => void
}

export const DeleteUsersDialog = ({
    users,
    showTrigger = true,
    onSuccess,
    ...props
}: DeleteUsersDialogProps) => {
    const [isPending, startTransition] = React.useTransition()

    const onDelete = () => {
        console.log({ ids: users.map((user) => user.id) });
        onSuccess?.();
        startTransition(async () => {
            deleteUsers({
                ids: users.map((user) => user.id),
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
                    description: "There was a problem with deleting the user.",
                });
            })
        })
    }

    return (
        <Dialog {...props}>
            {showTrigger ? (
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        <TrashIcon className="mr-2 size-4" aria-hidden="true" />
                        Delete ({users.length})
                    </Button>
                </DialogTrigger>
            ) : null}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your{" "}
                        <span className="font-medium">{users.length}</span>
                        {users.length === 1 ? " user" : " users"} from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:space-x-0">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
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
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}