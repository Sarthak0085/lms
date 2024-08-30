"use client"

import { User } from "@repo/db/types"
import { Button } from "@repo/ui"
import { DownloadIcon } from "@repo/ui/icon"
// import { DownloadIcon } from "@radix-ui/react-icons"
import { type Table } from "@tanstack/react-table"

// import { exportTableToCSV } from "@/lib/export"

// import { CreateTaskDialog } from "./create-task-dialog"
// import { DeleteTasksDialog } from "./delete-tasks-dialog"

interface UsersTableToolbarActionsProps {
    table: Table<User>
}

export function UsersTableToolbarActions({
    table,
}: UsersTableToolbarActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {/* {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteTasksDialog
                    tasks={table
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