"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/types"
import { useDataTable } from "@/hooks/use-data-table"
import { DataTable } from "@/components/admin/table/data-table"
import { DataTableToolbar } from "@/components/admin/table/data-table-toolbar"
import { getCategories } from "@/actions/category/get-categories"
import { Category } from "@repo/db/types"
import { getColumns } from "./category-table-columns"
import { CategoriesTableToolbarActions } from "./category-table-toolbar-actions"

interface CategoriesTableProps {
    categoriesPromise: ReturnType<typeof getCategories>
}

export const CategoriesTable = ({ categoriesPromise }: CategoriesTableProps) => {

    const { data, pageCount } = React.use(categoriesPromise);

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
    const filterFields: DataTableFilterField<Category>[] = [
        {
            label: "Name",
            value: "name",
            placeholder: "Filter by name...",
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
                <CategoriesTableToolbarActions table={table} />
            </DataTableToolbar>
        </DataTable>
    )
}