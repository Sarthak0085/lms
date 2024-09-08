"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { getSectionById } from "@/utils/helpers/section";
import { db } from "@repo/db";
import { UserRole } from "@repo/db/types";
import { getCourseById } from "../course/get-course";
import Mux from "@mux/mux-node";
import { revalidatePath } from "next/cache";

const { video } = new Mux({
    tokenId: process.env.MUX_TOKEN_ID as string,
    tokenSecret: process.env.MUX_TOKEN_SECRET as string,
});

export const deleteSection = async (courseId: string, contentId: string, parentId?: string) => {
    try {
        const user = await currentUser();

        if (!user) {
            throw new CustomError("UnAuthorized.Please login to access this fields", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to access this field", 403);
        }

        const isCourseExists = await getCourseById(courseId);

        if (!isCourseExists) {
            throw new CustomError("Course doesn't Exist", 404);
        }

        const existedSection = await getSectionById(contentId as string);

        if (!existedSection) {
            throw new CustomError("Section doesn't Exist", 404);
        }

        if (existedSection?.videoUrl && existedSection?.videoUrl !== "" && existedSection?.parentId && existedSection?.parentId !== "") {
            const existingMuxData = await db.videoMetadata.findUnique({
                where: {
                    contentId: contentId,
                },
            });

            if (existingMuxData) {
                await video.assets.delete(existingMuxData?.muxAssetId);
                await db.videoMetadata.delete({
                    where: {
                        id: existingMuxData.id,
                    },
                });
            }
        } else {
            const existedChildSections = await db.content.findMany({
                where: {
                    courseId: courseId,
                    parentId: existedSection?.id,
                }
            });

            for (let section of existedChildSections) {
                const existingMuxData = await db.videoMetadata.findUnique({
                    where: {
                        contentId: section?.id,
                    },
                });

                if (existingMuxData) {
                    await video.assets.delete(existingMuxData.muxAssetId);
                    await db.videoMetadata.delete({
                        where: {
                            id: existingMuxData.id,
                        },
                    });
                }
            }
        }

        await db.content.delete({
            where: {
                id: contentId,
                courseId: courseId,
            }
        });

        revalidatePath(`/admin/course/${courseId}/sections/${parentId ? parentId : contentId}`, "page");
        revalidatePath(`/admin/course/${courseId}/sections`, "page");

        return {
            success: "Section deleted successfully."
        }

    } catch (error) {
        console.log(error);
        if (error instanceof CustomError) {
            return {
                error: error.message,
                code: error.code,
            };
        }
        return {
            error: "An unexpected error occurred.",
            code: 500,
        };
    }
}