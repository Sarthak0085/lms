"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@repo/ui"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { formatDate, getCoursesLevelIcon, getCoursesStatusIcon } from "@/lib/utils"
import { Course, CourseStatus, Level } from "@repo/db/types"
import { CourseTableRowActions } from "./course-table-row-actions"
import { cn } from "@repo/ui/lib/utils"

export const getColumns = (): ColumnDef<Course>[] => {
    return [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                    className="translate-y-0.5"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                    className="translate-y-0.5"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Course Id" />
            ),
            cell: ({ row }) => <div className="w-20">{(row.getValue("id") as string).slice(0, 10)}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "title",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Title" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[20rem] truncate font-medium">
                            {row.getValue("title")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "slug",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Slug" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[20rem] truncate font-medium">
                            {row.getValue("slug")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "category",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Category" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("category")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Price" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] font-medium">
                            {row.getValue("price")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "estimatedPrice",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Actual Price" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] font-medium">
                            {row.getValue("estimatedPrice")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "status",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Status" />
            ),
            cell: ({ row }) => {
                const status = Object.values(CourseStatus).find(
                    (status) => status === row.original.status
                )

                if (!status) return null

                const Icon = getCoursesStatusIcon(status)

                return (
                    <div className={cn("flex items-center",
                        status === CourseStatus.DRAFT && "text-[#fd7e14]",
                        status === CourseStatus.PUBLISHED && "text-[#007bff]",
                        status === CourseStatus.ARCHIEVED && "text-[#6c757d]"
                    )}>
                        <Icon
                            className={cn("mr-2 size-5 text-muted-foreground",
                                status === CourseStatus.DRAFT && "text-[#fd7e14]",
                                status === CourseStatus.PUBLISHED && "text-[#007bff]",
                                status === CourseStatus.ARCHIEVED && "text-[#6c757d]"
                            )}
                            aria-hidden="true"
                        />
                        <span className="capitalize font-bold">{status}</span>
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return Array.isArray(value) && value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "level",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Level" />
            ),
            cell: ({ row }) => {
                const level = Object.values(Level).find(
                    (level) => level === row.original.level
                )

                if (!level) return null

                const Icon = getCoursesLevelIcon(level)

                return (
                    <div className={cn("flex items-center",
                        level === Level.BEGINNER && "text-[#98FB98]",
                        level === Level.INTERMEDIATE && "text-[#FFA500]",
                        level === Level.ADVANCED && "text-[#0000FF]",
                        level === Level.EXPERT && "text-[#FFD700]"
                    )}>
                        <Icon
                            className={cn("mr-2 size-5 text-muted-foreground",
                                level === Level.BEGINNER && "text-[#98FB98]",
                                level === Level.INTERMEDIATE && "text-[#FFA500]",
                                level === Level.ADVANCED && "text-[#0000FF]",
                                level === Level.EXPERT && "text-[#FFD700]"
                            )}
                            aria-hidden="true"
                        />
                        <span className="capitalize font-bold">{level}</span>
                    </div>
                )
            },
            filterFn: (row, id, value) => {
                return Array.isArray(value) && value.includes(row.getValue(id))
            },
        },
        {
            accessorKey: "purchased",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Purchased" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] font-medium">
                            {row.getValue("purchased")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "createdAt",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created At" />
            ),
            cell: ({ cell }) => formatDate(cell.getValue() as Date),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <div className="flex items-center justify-center">
                    <CourseTableRowActions row={row} />
                </div>
            ),
            size: 40,
        },
    ]
}