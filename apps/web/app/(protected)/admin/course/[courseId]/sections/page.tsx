import { getSections } from "@/actions/sections/get-sections";
import { PageContainer } from "@/components/admin/layout/page-container";
import { CourseSections } from "@/components/admin/section/course-sections";
import { Content } from "@repo/db/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Course Sections",
    description: "Admin can add or edit course sections here",
    keywords: "NextJs, MERN, ReactJs",
}

interface CourseSectionsPageProps {
    params: { courseId: string };
}

const CourseSectionsPage = async ({ params: { courseId } }: CourseSectionsPageProps) => {
    const { error, data } = await getSections(courseId);

    if (error) {
        return (
            <div className="w-full h-[100dvh] text-4xl text-red-500">
                {error}
            </div>
        )
    }

    return (
        <PageContainer scrollable={true}>
            <CourseSections courseId={courseId} sections={data as Content[]} />
        </PageContainer>
    )
};

export default CourseSectionsPage;