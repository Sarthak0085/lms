import { Header } from "@/components/layout/header";
import { FolderView } from "@/components/course/folder-view";
import { getSectionsByCourseId } from "@/actions/sections/get-sections";

interface SectionsLayoutProps {
    children: React.ReactNode;
    params: { courseId: string };
}

export default async function SectionsLayout({ children, params: { courseId } }: SectionsLayoutProps) {
    const content = await getSectionsByCourseId(courseId);
    return (
        <div>
            <Header />
            <div className='min-h-[95dvh-80px] flex'>
                <div className='w-[30%] min-h-[100dvh-80px] lg:block hidden backdrop-blur-md fixed border-r border-black/50 dark:border-white/50'>
                    {/* <ScrollArea> */}
                    <FolderView courseId={courseId} courseContent={content?.data || []} />
                    {/* <ScrollBar orientation="vertical" /> */}
                    {/* </ScrollArea> */}
                </div>
                <div className='w-full lg:pl-[30%] h-[95dvh-100px]'>
                    {children}
                </div>
            </div>
        </div>
    )
}