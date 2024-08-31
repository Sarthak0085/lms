import { User, UserRole, UserStatus } from "@repo/db/types"
import { ArchiveIcon, CheckCircledIcon, CheckCircleIcon, CircleBackslashIcon, PersonIcon, ShieldIcon, XCircleIcon } from "@repo/ui/icon"

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

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
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
 * @param role - The role of the task.
 * @returns A React component representing the role icon.
 */
export const getRoleIcon = (role: UserRole): any => {
    const roleIcons = {
        USER: PersonIcon,
        ADMIN: ShieldIcon,
    }

    return roleIcons[role] || PersonIcon;
}