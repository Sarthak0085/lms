import { useState } from "react"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@repo/ui"
import { DotsHorizontalIcon } from "@repo/ui/icon"
import type { Row } from "@tanstack/react-table"
import { Category } from "@repo/db/types"
import { CategoryDialog } from "./category-dialog"
import { DeleteCategoriesDialog } from "./delete-category-dialog"

interface CategoriesTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function CategoryTableRowActions<TData>({ row }: CategoriesTableRowActionsProps<TData>) {
    const [showEditCategoryDialog, setShowEditCategoryDialog] = useState(false);
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    return (
        <>
            <CategoryDialog
                isUpdate={true}
                data={row.original as Row<Category>["original"]}
                open={showEditCategoryDialog}
                onOpenChange={setShowEditCategoryDialog}
            />
            <DeleteCategoriesDialog
                open={showDeleteCategoryDialog}
                onOpenChange={setShowDeleteCategoryDialog}
                categories={[row.original as Row<Category>["original"]]}
                showTrigger={false}
                onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 sticky data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onSelect={() => setShowEditCategoryDialog(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteCategoryDialog(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}