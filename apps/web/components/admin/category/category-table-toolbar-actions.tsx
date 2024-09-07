"use client"

import { Category } from "@repo/db/types"
import { type Table } from "@tanstack/react-table"
import { CategoryDialog } from "./category-dialog"
import { DeleteCategoriesDialog } from "./delete-category-dialog"
import { useState } from "react"

interface CategoriesTableToolbarActionsProps {
    table: Table<Category>
}

export const CategoriesTableToolbarActions = ({
    table,
}: CategoriesTableToolbarActionsProps) => {
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    return (
        <div className="flex items-center gap-2">
            <CategoryDialog
                open={showCreateCategory}
                onOpenChange={setShowCreateCategory}
            />
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteCategoriesDialog
                    categories={table
                        .getFilteredSelectedRowModel()
                        .rows.map((row) => row.original)}
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                />
            ) : null}
            {/* <Button
                variant="outline"
                size="sm"
                onClick={() =>
                    exportTableToCSV(table, {
                        filename: "users",
                        excludeColumns: ["select", "actions"],
                    })
                }
            >
                <DownloadIcon className="mr-2 size-4" aria-hidden="true" />
                Export
            </Button> */}
            {/**
       * Other actions can be added here.
       * For example, import, view, etc.
       */}
        </div>
    )
}