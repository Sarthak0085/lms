"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/types"
import { useDataTable } from "@/hooks/use-data-table"
import { getColumns } from "./user-table-columns"
import { User, UserRole, UserStatus } from "@repo/db/types"
import { DataTable } from "@/components/admin/table/data-table"
import { DataTableToolbar } from "@/components/admin/table/data-table-toolbar"
import { UsersTableToolbarActions } from "./users-table-toolbar-actions"

interface TasksTableProps {
    tasksPromise: ReturnType<typeof getTasks>
}

export const UsersTable = ({ tasksPromise }: TasksTableProps) => {

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
    const filterFields: DataTableFilterField<User>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Filter names...",
        },
        {
            label: "Status",
            value: "status",
            options: Object.values(UserStatus).map((status: UserStatus) => ({
                label: status?.toUpperCase(),
                value: status,
                icon: getStatusIcon(status),
                withCount: true,
            })),
        },
        {
            label: "Role",
            value: "role",
            options: Object.values(UserRole).map((role: UserRole) => ({
                label: role,
                value: role,
                icon: getRoleIcon(role),
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
                <UsersTableToolbarActions table={table} />
            </DataTableToolbar>
        </DataTable>
    )
}