import { User, UserRole, UserStatus } from "@repo/db/types"
import { type Column } from "@tanstack/react-table"
import { ArchiveIcon, CheckCircledIcon, CheckCircleIcon, CircleBackslashIcon, FaUserShield, PersonIcon, ShieldIcon, XCircleIcon } from "@repo/ui/icon"

export const formatDate = (
    date: Date | string | number,
    opts: Intl.DateTimeFormatOptions = {}
) => {
    return new Intl.DateTimeFormat("en-US", {
        month: opts.month ?? "long",
        day: opts.day ?? "numeric",
        year: opts.year ?? "numeric",
        ...opts,
    }).format(new Date(date))
}

export function getCommonPinningStyles<TData>({
    column,
    withBorder = false,
}: {
    column: Column<TData>
    /**
     * Whether to show a box shadow on the right side of the last left pinned column or the left side of the first right pinned column.
     * This is useful for creating a border between the pinned columns and the scrollable columns.
     * @default false
     */
    withBorder?: boolean
}): React.CSSProperties {
    const isPinned = column.getIsPinned()
    const isLastLeftPinnedColumn =
        isPinned === "left" && column.getIsLastColumn("left")
    const isFirstRightPinnedColumn =
        isPinned === "right" && column.getIsFirstColumn("right")

    return {
        boxShadow: withBorder
            ? isLastLeftPinnedColumn
                ? "-4px 0 4px -4px hsl(var(--border)) inset"
                : isFirstRightPinnedColumn
                    ? "4px 0 4px -4px hsl(var(--border)) inset"
                    : undefined
            : undefined,
        left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
        right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
        opacity: isPinned ? 0.97 : 1,
        position: isPinned ? "sticky" : "relative",
        background: isPinned ? "hsl(var(--background))" : "hsl(var(--background))",
        width: column.getSize(),
        zIndex: isPinned ? 1 : 0,
    }
}

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the user.
 * @returns A React component representing the status icon.
 */
export const getStatusIcon = (status: UserStatus): any => {
    const statusIcons = {
        ACTIVE: CheckCircledIcon,
        BLOCK: CircleBackslashIcon,
        ARCHIEVED: ArchiveIcon,
    }

    return statusIcons[status] || CheckCircledIcon
}

/**
 * Returns the appropriate role icon based on the provided role.
 * @param role - The role of the user.
 * @returns A React component representing the role icon.
 */
export const getRoleIcon = (role: UserRole): any => {
    const roleIcons = {
        USER: PersonIcon,
        ADMIN: FaUserShield,
    }

    return roleIcons[role] || PersonIcon;
}