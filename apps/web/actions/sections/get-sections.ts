"use server";

import CustomError from "@/lib/custom-error";
import { db } from "@repo/db";
import { ContentType } from "@repo/db/types";
import { unstable_noStore as noStore } from "next/cache";

export const getSections = async (courseId: string) => {
    noStore();
    try {
        const data = await db.content.findMany({
            where: {
                courseId: courseId,
            }
        });

        return {
            data
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}

export const getSectionById = async (courseId: string, sectionId: string) => {
    noStore();
    try {
        const data = await db.content.findMany({
            where: {
                courseId: courseId,
                id: sectionId,
            }
        });

        return {
            data
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}

export const getSectionsByParentId = async (courseId: string, sectionId: string) => {
    noStore();
    try {
        const data = await db.content.findMany({
            where: {
                courseId: courseId,
                parentId: sectionId,
            },
            include: {
                links: true
            }
        });

        return {
            data
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}

export const getSectionsByCourseId = async (courseId: string) => {
    noStore();
    try {
        const data = await db.content.findMany({
            where: {
                courseId: courseId,
            },
            include: {
                children: {
                    include: {
                        markAsCompleted: true,
                        videoProgress: true,
                        VideoMetadata: true,
                    }
                }
            }
        });


        return {
            data,
        }
    } catch (error) {
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            data: [],
            code: 500,
        };
    }
}

export const getSectionByCourseIdAndSectionId = async (courseId: string, sectionId: string) => {
    noStore();
    try {
        const course = await db.course.findUnique({
            where: { id: courseId },
            include: { content: { orderBy: { position: "asc" } } }
        });

        if (!course) {
            throw new Error("Course not found");
        }

        const data = await db.content.findUnique({
            where: { id: sectionId },
            include: {
                links: true,
                VideoMetadata: true,
                videoProgress: true,
                NotionMetadata: true,
                markAsCompleted: true,
                questions: true,
                Course: {
                    include: {
                        reviews: true,
                    }
                },
            }
        });

        if (!data) {
            throw new Error("Section not found");
        }

        const sections = course.content.filter((con) => con.parentId === data.parentId && con.type !== ContentType.FOLDER);

        const index = sections.findIndex((section) => section.id === data.id);

        let prevSection = null, nextSection = null;

        let folderSections = course.content.filter((con) => con.type === ContentType.FOLDER);
        const currentFolderIndex = folderSections.findIndex((folder) => folder.id === data.parentId);

        if (currentFolderIndex !== -1) {
            const prevFolder = folderSections[currentFolderIndex - 1];
            if (prevFolder) {
                const prevFolderSections = course.content.filter((con) => con.parentId === prevFolder.id && con.type !== ContentType.FOLDER);
                prevSection = prevFolderSections[prevFolderSections.length - 1] || prevSection;
            }

            const nextFolder = folderSections[currentFolderIndex + 1];
            if (nextFolder) {
                const nextFolderSections = course.content.filter((con) => con.parentId === nextFolder.id && con.type !== ContentType.FOLDER);
                nextSection = nextFolderSections[0] || nextSection;
            }
        }

        prevSection = index > 0 ? sections[index - 1] : null;
        nextSection = index < sections.length - 1 ? sections[index + 1] : null;

        return {
            data,
            prevSection,
            nextSection
        };
    } catch (error) {
        console.error(error);
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            data: null,
            prevSection: null,
            nextSection: null,
        };
    }
}
