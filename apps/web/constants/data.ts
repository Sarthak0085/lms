import { NavItem } from "@/types";
import { UserRole, UserStatus } from "@repo/db/types";
import { CircuitBoardIcon, LayoutDashboardIcon, LogOutIcon, User, User2Icon } from "@repo/ui/icon";

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboardIcon,
        label: 'Dashboard'
    },
    {
        title: 'User',
        href: '/adim/user',
        icon: User,
        label: 'user'
    },
    {
        title: 'Employee',
        href: '/admin/employee',
        icon: 'employee',
        label: 'employee'
    },
    {
        title: 'Profile',
        href: '/admin/profile',
        icon: User2Icon,
        label: 'profile'
    },
    {
        title: 'Kanban',
        href: '/admin/kanban',
        icon: CircuitBoardIcon,
        label: 'kanban'
    },
    {
        title: 'Logout',
        href: '/',
        icon: LogOutIcon,
        label: 'login'
    }
];

export const userRoles = [
    {
        value: UserRole.USER
    },
    {
        value: UserRole.ADMIN,
    }
];

export const userStatuses = [
    {
        value: UserStatus.ACTIVE,
    },
    {
        value: UserStatus.BLOCK,
    },
    {
        value: UserStatus.ARCHIEVED,
    }
]