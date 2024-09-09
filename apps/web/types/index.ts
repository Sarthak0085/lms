import { Benefit, Content, Course, DemoMetadata, Link, Prerequisite, Question, Review, User } from "@repo/db/types";

export interface NavItem {
    title: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: any;
    label?: string;
    description?: string;
}

export type ExtendContent = Content & {
    links: Link[];
}

export type ExtendQuestion = Question & {
    author?: User;
    onContent?: Content;
};

export type ExtendCourse = Course & {
    reviews?: Review[];
    benefits?: Benefit[];
    prerequisites?: Prerequisite[];
    content?: Content[];
    demoMetadata?: DemoMetadata;
}

export interface SearchParams {
    [key: string]: string | string[] | undefined
}

export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
    withCount?: boolean
}

export interface DataTableFilterField<TData> {
    label: string
    value: keyof TData
    placeholder?: string
    options?: Option[]
}