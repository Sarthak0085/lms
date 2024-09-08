import { useState } from "react"
import {
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@repo/ui"
import { DotsHorizontalIcon } from "@repo/ui/icon"
import type { Row } from "@tanstack/react-table"
import { Course } from "@repo/db/types"
import Link from "next/link"
import { DeleteCoursesDialog } from "./delete-course-dialog"

interface CoursesTableRowActionsProps<TData> {
    row: Row<TData>;
}

export function CourseTableRowActions<TData>({ row }: CoursesTableRowActionsProps<TData>) {
    const [showDeleteCategoryDialog, setShowDeleteCategoryDialog] = useState(false);
    const course = row.original as Row<Course>["original"]
    return (
        <>
            <DeleteCoursesDialog
                open={showDeleteCategoryDialog}
                onOpenChange={setShowDeleteCategoryDialog}
                courses={[row.original as Row<Course>["original"]]}
                showTrigger={false}
                onSuccess={() => row.toggleSelected(false)}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-label="Open menu"
                        variant="ghost"
                        className="flex size-8 p-0 sticky data-[state=open]:bg-muted"
                    >
                        <DotsHorizontalIcon className="size-4" aria-hidden="true" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem>
                        <Link href={`/admin/edit-course/${course?.id}`}>
                            Edit Course
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Link href={`/admin/edit-course/${course?.id}/sections`}>
                            Edit Sections
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onSelect={() => setShowDeleteCategoryDialog(true)}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}