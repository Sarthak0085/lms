"use client"

import { Course } from "@repo/db/types"
import { type Table } from "@tanstack/react-table"
import { DeleteCoursesDialog } from "./delete-course-dialog"

interface CoursesTableToolbarActionsProps {
    table: Table<Course>
}

export const CoursesTableToolbarActions = ({
    table,
}: CoursesTableToolbarActionsProps) => {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteCoursesDialog
                    courses={table
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