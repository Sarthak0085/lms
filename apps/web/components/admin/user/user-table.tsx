"use client"
"use memo"

import * as React from "react"
// import { tasks, type Task } from "@/db/schema"
import { type DataTableFilterField } from "@/types"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { type getTasks } from "../_lib/queries"
import { getPriorityIcon, getStatusIcon } from "../_lib/utils"
import { getColumns } from "./tasks-table-columns"
import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions"

interface TasksTableProps {
    tasksPromise: ReturnType<typeof getTasks>
}

export function TasksTable({ tasksPromise }: TasksTableProps) {

    const { data, pageCount } = React.use(tasksPromise)

    // Memoize the columns so they don't re-render on every render
    const columns = React.useMemo(() => getColumns(), [])

    /**
     * This component can render either a faceted filter or a search filter based on the `options` prop.
     *
     * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
     *
     * Each `option` object has the following properties:
     * @prop {string} label - The label for the filter option.
     * @prop {string} value - The value for the filter option.
     * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
     * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
     */
    const filterFields: DataTableFilterField<Task>[] = [
        {
            label: "Title",
            value: "title",
            placeholder: "Filter titles...",
        },
        {
            label: "Status",
            value: "status",
            options: tasks.status.enumValues.map((status: any) => ({
                label: status[0]?.toUpperCase() + status.slice(1),
                value: status,
                icon: getStatusIcon(status),
                withCount: true,
            })),
        },
        {
            label: "Priority",
            value: "priority",
            options: tasks.priority.enumValues.map((priority: any) => ({
                label: priority[0]?.toUpperCase() + priority.slice(1),
                value: priority,
                icon: getPriorityIcon(priority),
                withCount: true,
            })),
        },
    ]

    const { table } = useDataTable({
        data,
        columns,
        pageCount,
        filterFields,
        initialState: {
            sorting: [{ id: "createdAt", desc: true }],
            columnPinning: { right: ["actions"] },
        },
        // For remembering the previous row selection on page change
        getRowId: (originalRow: any, index: number) => `${originalRow.id}-${index}`,
        /* */
    })

    return (
        <DataTable
            table={table}
        >
            <DataTableToolbar table={table} filterFields={filterFields}>
                <TasksTableToolbarActions table={table} />
            </DataTableToolbar>
        </DataTable>
    )
}