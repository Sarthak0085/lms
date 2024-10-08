"use client"
"use memo"

import * as React from "react"
import { type DataTableFilterField } from "@/types"
import { useDataTable } from "@/hooks/use-data-table"
import { Question } from "@repo/db/types"
import { DataTable } from "@/components/table/data-table"
import { DataTableToolbar } from "@/components/table/data-table-toolbar"
import { getColumns } from "./question-table-columns"
import { QuestionsTableToolbarActions } from "./questions-table-toolbar-actions"
import { getQuestions } from "@/actions/questions/get-questions"

interface QuestionsTableProps {
    questionsPromise: ReturnType<typeof getQuestions>
}

export const QuestionsTable = ({ questionsPromise }: QuestionsTableProps) => {

    const { data, pageCount } = React.use(questionsPromise);

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
    const filterFields: DataTableFilterField<Question>[] = [
        {
            label: "Content",
            value: "content",
            placeholder: "Filter content...",
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
                <QuestionsTableToolbarActions table={table} />
            </DataTableToolbar>
        </DataTable>
    )
}