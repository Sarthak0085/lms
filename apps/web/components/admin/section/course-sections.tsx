"use client";

import { z } from "zod";
import { Content, ContentType } from "@repo/db/types";
import { SectionDialog } from "./section-dialog";
import { Button } from "@repo/ui";
import Link from "next/link";
import { RxArrowLeft } from "@repo/ui/icon";

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title is required and must be at least 2 characters long",
    }),
});

interface CourseSectionsProps {
    courseId: string;
    sections: Content[]
}

export const CourseSections = ({
    courseId,
    sections
}: CourseSectionsProps) => {
    // const pathname = usePathname();
    // const router = useRouter();

    // const routes = [
    //     {
    //         label: "Basic Information",
    //         path: `/instructor/courses/${course.id}/basic`,
    //     },
    //     { label: "Curriculum", path: `/instructor/courses/${course.id}/sections` },
    // ];

    // 1. Define your form.

    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        //     try {
        //         const response = await axios.post(
        //             `/api/courses/${course.id}/sections`,
        //             values
        //         );
        //         router.push(
        //             `/instructor/courses/${course.id}/sections/${response.data.id}`
        //         );
        //         toast.success("New Section created!");
        //     } catch (err) {
        //         toast.error("Something went wrong!");
        //         console.log("Failed to create a new section", err);
        //     }
    };

    // const onReorder = async (updateData: { id: string; position: number }[]) => {
    //     try {
    //         await axios.put(`/api/courses/${course.id}/sections/reorder`, {
    //             list: updateData,
    //         });
    //         toast.success("Sections reordered successfully");
    //     } catch (err) {
    //         console.log("Failed to reorder sections", err);
    //         toast.error("Something went wrong!");
    //     }
    // };

    return (
        <div className="px-10 py-6">
            <div className="w-full flex items-center justify-between">
                <Button variant={"primary"} asChild>
                    <Link href={"/admin/courses"}>
                        <RxArrowLeft size={20} className="me-2" /> Back to Courses
                    </Link>
                </Button>
                <SectionDialog
                    courseId={courseId}
                    sectionLength={sections?.filter(section => section.type === ContentType.FOLDER).length}
                />
            </div>
            {/* <div className="flex gap-5">
                {routes.map((route) => (
                    <Link key={route.path} href={route.path}>
                        <Button variant={pathname === route.path ? "default" : "outline"}>
                            {route.label}
                        </Button>
                    </Link>
                ))}
            </div> */}

            {/* <SectionList
                items={course.sections || []}
                onReorder={onReorder}
                onEdit={(id) =>
                    router.push(`/instructor/courses/${course.id}/sections/${id}`)
                }
            /> */}


        </div>
    );
};
