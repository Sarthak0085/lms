import { getSectionByCourseIdAndSectionId } from "@/actions/sections/get-sections";
import { SectionDetails } from "@/components/course/section-details";
import { ScrollArea } from "@repo/ui";

interface SectionDetailsPageProps {
    params: {
        courseId: string;
        sectionId: string;
    }
}

const SectionDetailsPage = async ({
    params: {
        courseId,
        sectionId
    }
}: SectionDetailsPageProps) => {
    const section = getSectionByCourseIdAndSectionId(courseId, sectionId);

    return (
        // <ScrollArea >
        <SectionDetails courseId={courseId} content={section} />
    )
};

export default SectionDetailsPage;