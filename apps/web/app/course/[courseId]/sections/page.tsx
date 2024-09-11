import { PageContainer } from '@/components/admin/layout/page-container';
import { CourseDetailsPage } from '@/components/course/course-details-page';
import { FolderView } from '@/components/course/folder-view';
import { Footer } from '@/components/footer';
import { Header } from '@/components/layout/header';
import { domain } from '@/lib/domain';
import { Content, ContentType } from '@repo/db/types';
import { ScrollArea, ScrollBar } from '@repo/ui';
import React from 'react'

interface CourseSectionsPageProps {
    params: { courseId: string };
}

const CourseSectionsPage = async ({ params: { courseId } }: CourseSectionsPageProps) => {
    const response = await fetch(`${domain}/api/courses/${courseId}/sections`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const course = await response.json();
    // const contents = course?.filter((c)=>c.type === ContentType.FOLDER)
    console.log("course", course);

    return (
        <>
            <Header />
            <div className='min-h-[95dvh-80px] flex'>
                <div className='w-[30%] min-h-[100dvh-80px] lg:block hidden backdrop-blur-md fixed border-r border-black/50 dark:border-white/50'>
                    {/* <ScrollArea> */}
                    <FolderView courseId={courseId} courseContent={course?.content} />
                    {/* <ScrollBar orientation="vertical" /> */}
                    {/* </ScrollArea> */}
                </div>
                <div className='w-full lg:pl-[30%] h-[95dvh-100px]'>
                    <PageContainer scrollable={true}>
                        <CourseDetailsPage course={course} />
                    </PageContainer>
                </div>
            </div >
        </>
    )
}

export default CourseSectionsPage;