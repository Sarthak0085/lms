"use client"

import { Question } from "@repo/db/types"
import { DownloadIcon } from "@repo/ui/icon"
import { type Table } from "@tanstack/react-table"
import { DeleteQuestionsDialog } from "./delete-questions-dialog"
// import { exportTableToCSV } from "@/lib/export"

interface QuestionssTableToolbarActionsProps {
    table: Table<Question>
}

export function QuestionsTableToolbarActions({
    table,
}: QuestionssTableToolbarActionsProps) {
    return (
        <div className="flex items-center gap-2">
            {table.getFilteredSelectedRowModel().rows.length > 0 ? (
                <DeleteQuestionsDialog
                    questions={table
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