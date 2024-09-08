import { getSectionsByParentId } from "@/actions/sections/get-sections";
import { PageContainer } from "@/components/admin/layout/page-container";
import { CourseSections } from "@/components/admin/section/course-sections";
import { SectionForm } from "@/components/admin/section/section-form";
import { SectionManager } from "@/components/admin/section/section-manager";
import { ExtendContent } from "@/types";
import { Content } from "@repo/db/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Section Details",
    description: "Admin can add or edit course sections here",
    keywords: "NextJs, MERN, ReactJs",
}

interface CourseSectionsPageProps {
    params: { courseId: string; sectionId: string; };
}

const SectionDetailsPage = async ({ params: { courseId, sectionId } }: CourseSectionsPageProps) => {
    const { error, data } = await getSectionsByParentId(courseId, sectionId);

    if (error) {
        return (
            <div className="w-full h-[100dvh] text-4xl text-red-500">
                {error}
            </div>
        )
    }

    return (
        <PageContainer scrollable={true}>
            <SectionManager courseId={courseId} sectionId={sectionId} data={data as ExtendContent[]} />
        </PageContainer>
    )
};

export default SectionDetailsPage;