"use client"

import { Category, User } from "@repo/db/types"
import { Button } from "@repo/ui"
import { DownloadIcon } from "@repo/ui/icon"
import { type Table } from "@tanstack/react-table"
import { CategoryDialog } from "./category-dialog"
// import { exportTableToCSV } from "@/lib/export"

interface CategoriesTableToolbarActionsProps {
    table: Table<Category>
}

export const CategoriesTableToolbarActions = ({
    table,
}: CategoriesTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <CategoryDialog />
            ) : null} */}
            <CategoryDialog />
            {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteUsersDialog
                    users={table
                        .getFilteredSelectedRowModel()
                        .rows.map((row) => row.original)}
                    onSuccess={() => table.toggleAllRowsSelected(false)}
                />
            ) : null} */}
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