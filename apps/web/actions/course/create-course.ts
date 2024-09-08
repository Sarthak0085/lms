"use server";

import { currentUser } from "@/lib/auth";
import CustomError from "@/lib/custom-error";
import { video } from "@/lib/video";
import { CreateCourseSchema } from "@/schemas";
import { getCourseBySlug } from "@/utils/helpers/course";
import { validateCreateCourse } from "@/validations";
import { db } from "@repo/db";
import { UserRole, VideoStatus } from "@repo/db/types";
import * as z from "zod";

export const createCourse = async (values: z.infer<typeof CreateCourseSchema>) => {
    try {
        const validatedData = validateCreateCourse(values);
        const { course: { title, subTitle, description, price, estimatedPrice, slug, demoUrl, thumbnail, category, tags, level }, prerequisites, benefits } = validatedData;
        const user = await currentUser();
        if (!user) {
            throw new CustomError("UnAuthorized. Please login to access this!!", 401);
        }

        if (user?.role !== UserRole.ADMIN) {
            throw new CustomError("Foridden. You are not allowed to access this!!", 403);
        }

        const existedCourse = await getCourseBySlug(slug);
        if (existedCourse) {
            throw new CustomError("Course already exist withgiven slug. Please change name and slug", 409);
        }

        const newCourse = await db.course.create({
            data: {
                title: title,
                subTitle: subTitle,
                slug: slug,
                description: description,
                price: Number(price),
                estimatedPrice: Number(estimatedPrice),
                demoUrl: demoUrl,
                level: level,
                category: category,
                tags: tags,
                thumbnail: thumbnail,
            }
        });

        if (demoUrl && demoUrl !== "") {
            const asset = await video.assets.create({
                input: demoUrl as any,
                max_resolution_tier: '1080p',
                playback_policy: ['public'],
                test: false,
            });

            await db.demoMetadata.create({
                data: {
                    muxAssetId: asset?.id,
                    playbackUrl: asset?.playback_ids?.[0]?.id as string,
                    courseId: newCourse?.id,
                    duration: asset?.duration,
                    thumbnailUrl: thumbnail,
                    status: asset?.status === "preparing" ?
                        VideoStatus?.PROCESSING :
                        asset?.status === "errored" ?
                            VideoStatus.FAILED :
                            VideoStatus.READY
                }
            })

        }

        if (benefits && benefits.length > 0) {
            await db.benefit.createMany({
                data: benefits.map(benefit => ({
                    courseId: newCourse.id,
                    title: benefit.title,
                }))
            });
        }

        if (prerequisites && prerequisites.length > 0) {
            await db.prerequisite.createMany({
                data: prerequisites.map(prerequisite => ({
                    courseId: newCourse.id,
                    title: prerequisite.title,
                }))
            });
        }

        return {
            success: "Course Created Successfully!!",
            data: {
                id: newCourse?.id
            }
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
            code: 500,
        };
    }
}