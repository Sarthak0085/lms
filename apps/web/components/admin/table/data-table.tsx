import * as React from "react"
import { flexRender, type Table as TanstackTable } from "@tanstack/react-table"
import {
    ScrollArea,
    ScrollBar,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@repo/ui";
import { cn } from "@repo/ui/lib/utils";
import { DataTablePagination } from "./data-table-pagination";
import { getCommonPinningStyles } from "@/lib/utils";

interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * The table instance returned from useDataTable hook with pagination, sorting, filtering, etc.
     * @type TanstackTable<TData>
     */
    table: TanstackTable<TData>
}

export function DataTable<TData>({
    table,
    children,
    className,
    ...props
}: DataTableProps<TData>) {
    return (
        <div
            className={cn("w-full space-y-2.5 overflow-auto", className)}
            {...props}
        >
            {children}
            <ScrollArea className="h-[calc(80vh-220px)] w-[100%] rounded-md border md:h-[calc(80dvh-200px)]">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                colSpan={header.colSpan}
                                                style={{
                                                    ...getCommonPinningStyles({ column: header.column }),
                                                }}
                                            >
                                                <div>{header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}</div>
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                style={{
                                                    ...getCommonPinningStyles({ column: cell.column }),
                                                }}
                                            >
                                                <div>{flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}</div>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={table.getAllColumns().length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <div className="flex flex-col gap-2.5">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}