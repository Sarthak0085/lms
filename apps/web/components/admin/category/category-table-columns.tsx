"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage, Checkbox } from "@repo/ui"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { formatDate } from "@/lib/utils"
import { Category, User } from "@repo/db/types"
import { CategoryTableRowActions } from "./category-table-row-actions"

export const getColumns = (): ColumnDef<Category>[] => {
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
                <DataTableColumnHeader column={column} title="Category Id" />
            ),
            cell: ({ row }) => <div className="w-20">{(row.getValue("id") as string).slice(0, 10)}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("name")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "user",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="User" />
            ),
            cell: ({ row }) => {
                const user = row.getValue("user") as User;
                return (
                    <div className="flex items-center space-x-2">
                        <Avatar
                            className={"w-[30px] h-[30px] cursor-pointer rounded-full"}
                        >
                            <AvatarImage src={user?.image as string} alt={user?.name ?? "Avatar"} />
                            <AvatarFallback className="bg-slate-600/90">
                                <h1 className="uppercase text-black dark:text-white text-[14px]">
                                    {user?.name?.slice(0, 2)}
                                </h1>
                            </AvatarFallback>
                        </Avatar>
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {user.name}
                        </span>
                    </div>
                )
            },
            enableSorting: false,
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
                    <CategoryTableRowActions row={row} />
                </div>
            ),
            size: 40,
        },
    ]
}