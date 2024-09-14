"use client"

import * as React from "react"
import { type ColumnDef } from "@tanstack/react-table"
import { Avatar, AvatarFallback, AvatarImage, Checkbox } from "@repo/ui"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { Content, Question, User } from "@repo/db/types"
import { formatDate } from "@/lib/utils"
import { QuestionsTableRowActions } from "./question-table-row-actions"
import Image from "next/image"

export const getColumns = (): ColumnDef<Question>[] => {
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
                <DataTableColumnHeader column={column} title="User Id" />
            ),
            cell: ({ row }) => <div className="w-20">{(row.getValue("id") as string).slice(0, 10)}</div>,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "content",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Content" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("content")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "author",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Author" />
            ),
            cell: ({ row }) => {
                const author = row?.getValue("author") as User;
                return (
                    <div className="flex items-center space-x-2">
                        <Avatar
                            className={"w-[30px] h-[30px] cursor-pointer rounded-full"}
                        >
                            <AvatarImage src={author?.image as string} alt={author?.name ?? "Avatar"} />
                            <AvatarFallback className="bg-slate-600/90">
                                <h1 className="uppercase text-black dark:text-white text-[14px]">
                                    {author?.name?.slice(0, 2)}
                                </h1>
                            </AvatarFallback>
                        </Avatar>
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {author?.name}
                        </span>
                    </div>
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "onContent",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Section" />
            ),
            cell: ({ row }) => {
                const section = row?.getValue("onContent") as Content;
                return (
                    <div className="flex items-center space-x-2">
                        <Image
                            src={section?.thumbnail ?? ""}
                            alt="Thumbnail"
                            width={30}
                            height={30}
                            className="w-[30px] h-[30px] rounded-full"
                        />
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {section?.title}
                        </span>
                    </div>
                )
            },
            enableSorting: false,
        },
        {
            accessorKey: "upvotes",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Upvotes" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("upvotes")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "downvotes",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Downvotes" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("downvotes")}
                        </span>
                    </div>
                )
            },
        },
        {
            accessorKey: "totalanswers",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Total Answers" />
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex space-x-2">
                        <span className="max-w-[31.25rem] truncate font-medium">
                            {row.getValue("totalanswers")}
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
                    <QuestionsTableRowActions row={row} />
                </div>
            ),
            size: 40,
        },
    ]
}