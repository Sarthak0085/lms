"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { SectionContentSchema } from "@/schemas";
import { getSectionById } from "@/utils/helpers/section";
import { validateSectionContent } from "@/validations";
import { db } from "@repo/db";
import { ContentType, UserRole, VideoStatus } from "@repo/db/types";
import * as z from "zod";
import { revalidatePath } from "next/cache";
import { video } from "@/lib/video";
import { getCourseById } from "@/utils/helpers/course";

export const createSection = async (values: z.infer<typeof SectionContentSchema>) => {
    try {
        const validatedData = validateSectionContent(values);
        const { id, title, type, thumbnail, parentId, hidden, description, links, position, courseId, videoUrl } = validatedData;

        const user = await currentUser();

        if (!user) {
            throw new CustomError("UnAuthorized.Please login to access this fields", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Forbidden. You are not allowed to access this field", 403);
        }

        const isCourseExists = await getCourseById(courseId);

        if (!isCourseExists) {
            throw new CustomError("Course doesn't exists", 404);
        }
        console.log("after course");

        const existedSection = await getSectionById(id as string);

        if (existedSection) {
            throw new CustomError("Section already exists", 409);
        }

        if (!parentId || parentId === "") {
            console.log("started")
            const section = await db.content.create({
                data: {
                    title: title,
                    position: position,
                    type: type,
                    hidden: hidden,
                    courseId: courseId,
                }
            });

            console.log(section);

            return {
                success: "Section Created Successfully",
                section,
            }
        } else {
            const section = await db.content.create({
                data: {
                    title: title,
                    type: type,
                    thumbnail: thumbnail,
                    parentId: parentId,
                    courseId: courseId,
                    description: description,
                    videoUrl: videoUrl,
                    position: position,
                    hidden: hidden,
                }
            });
            if (links && links.length > 0) {
                const customLinks = links.map(link => ({
                    title: link.title,
                    url: link.url,
                    contentId: section?.id,
                }))
                await db.link.createMany({
                    data: customLinks
                });
            }
            if (type === ContentType.VIDEO) {
                if (videoUrl && videoUrl !== "") {
                    const asset = await video.assets.create({
                        input: videoUrl as any,
                        playback_policy: ["public"],
                        test: false,
                        max_resolution_tier: "1080p",
                    });

                    let videoMetadata = await db.videoMetadata.create({
                        data: {
                            muxAssetId: asset.id,
                            playbackUrl: asset.playback_ids?.[0]?.id as string,
                            contentId: section.id,
                            thumbnailUrl: thumbnail,
                            duration: null, // Initially null
                            status: VideoStatus.PROCESSING,
                        },
                    });

                    const getAssetMetadata = async (assetId: string) => {
                        const assetDetails = await video.assets.retrieve(assetId);
                        return assetDetails;
                    };

                    let assetDetails = await getAssetMetadata(asset.id);
                    while (assetDetails.status === 'preparing') {
                        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
                        assetDetails = await getAssetMetadata(asset.id);
                    }

                    await db.videoMetadata.update({
                        where: {
                            id: videoMetadata.id
                        },
                        data: {
                            duration: assetDetails.duration,
                            status: VideoStatus.READY,
                        }
                    });
                }
                console.log("after creation");

                revalidatePath(`/admin/course/${courseId}/sections`, "page");
                revalidatePath(`/admin/course/${courseId}/sections/${parentId}`, "page");

                return {
                    success: "Section Saved Successfully"
                }
            }
        }

    } catch (error) {
        console.error(error)
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