import { useState } from "react"
import { DeleteUsersDialog } from "./delete-user-dialog"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@repo/ui"
import { DotsHorizontalIcon } from "@repo/ui/icon"
import type { Row } from "@tanstack/react-table"
import { User, UserRole } from "@repo/db/types"
import { EditUserDialog } from "./edit-user-dialog"

interface UsersTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function UserTableRowActions<TData>({ row }: UsersTableRowActionsProps<TData>) {
    const [showUpdateUserDialog, setShowEditUserDialog] = useState(false)
    const [showDeleteUserDialog, setShowDeleteUserDialog] = useState(false)
    return ((row.original as Row<User>["original"]).role !== UserRole.ADMIN &&
        <>
            <EditUserDialog
                open={showUpdateUserDialog}
                setOpen={setShowEditUserDialog}
                user={row.original as Row<User>["original"]}
            />
            <DeleteUsersDialog
                open={showDeleteUserDialog}
                onOpenChange={setShowDeleteUserDialog}
                users={[row.original as Row<User>["original"]]}
                showTrigger={false}
                onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => setShowEditUserDialog(true)}>
                        Edit
                    </DropdownMenuItem>
                    {/* <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
                        <DropdownMenuSubContent>
                            <DropdownMenuRadioGroup
                                value={row.original.label}
                                onValueChange={(value) => {
                                    startUpdateTransition(() => {
                                        toast.promise(
                                            updateTask({
                                                id: row.original.id,
                                                label: value as Task["label"],
                                            }),
                                            {
                                                loading: "Updating...",
                                                success: "Label updated",
                                                error: (err) => getErrorMessage(err),
                                            }
                                        )
                                    })
                                }}
                            >
                                {tasks.label.enumValues.map((label) => (
                                    <DropdownMenuRadioItem
                                        key={label}
                                        value={label}
                                        className="capitalize"
                                        disabled={isUpdatePending}
                                    >
                                        {label}
                                    </DropdownMenuRadioItem>
                                ))}
                            </DropdownMenuRadioGroup>
                        </DropdownMenuSubContent>
                    </DropdownMenuSub> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteUserDialog(true)}
                    >
                        Delete
                        {/* <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut> */}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}