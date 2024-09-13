import { NavItem } from "@/types";
import { UserRole, UserStatus } from "@repo/db/types";
import { BadgePlusIcon, BiCategory, CircuitBoardIcon, LayoutDashboardIcon, LogOutIcon, User, User2Icon } from "@repo/ui/icon";
import { ListVideoIcon, PiUsersFour } from "../../../packages/ui/src/icons";

export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: LayoutDashboardIcon,
        label: 'Dashboard'
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: PiUsersFour,
        label: 'users'
    },
    {
        title: 'Courses',
        href: '/admin/courses',
        icon: ListVideoIcon,
        label: 'courses'
    },
    {
        title: 'Create Course',
        href: '/admin/create-course',
        icon: BadgePlusIcon,
        label: 'create-course'
    },
    {
        title: 'Categories',
        href: '/admin/categories',
        icon: BiCategory,
        label: 'categories'
    },
    // {
    //     title: 'Employee',
    //     href: '/admin/employee',
    //     icon: 'employee',
    //     label: 'employee'
    // },
    {
        title: 'Profile',
        href: '/admin/profile',
        icon: User2Icon,
        label: 'profile'
    },
    // {
    //     title: 'Kanban',
    //     href: '/admin/kanban',
    //     icon: CircuitBoardIcon,
    //     label: 'kanban'
    // },
    {
        title: 'Logout',
        href: '/',
        icon: LogOutIcon,
        label: 'logout'
    }
];

export const userRoles = [
    {
        value: UserRole?.USER
    },
    {
        value: UserRole?.ADMIN,
    }
];

export const userStatuses = [
    {
        value: UserStatus?.ACTIVE,
    },
    {
        value: UserStatus?.BLOCK,
    },
    {
        value: UserStatus?.ARCHIEVED,
    }
]