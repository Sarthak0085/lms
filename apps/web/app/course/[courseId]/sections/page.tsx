import { currentUser } from '@/lib/auth';
import { domain } from '@/lib/domain';
import { ExtendCourse } from '@/types';
import { Purchase } from '@repo/db/types';
import { redirect } from 'next/navigation';
import React from 'react'

interface CourseSectionsPageProps {
    params: { courseId: string };
}

const CourseSectionsPage = async ({ params: { courseId } }: CourseSectionsPageProps) => {
    const user = await currentUser();
    const response = await fetch(`${domain}/api/courses/${courseId}/sections`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const course: ExtendCourse = await response.json();

    const purchasedResponse = await fetch(`${domain}/api/${user?.id}/purchased`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const purchases = await purchasedResponse.json();

    const isPurchased = purchases?.find((purchase: Purchase) => purchase.userId === user?.id && purchase.courseId === courseId);

    if (!isPurchased) {
        return redirect(`/course/${courseId}`);
    }

    const folders = course?.content?.filter((con) => con.type === "FOLDER");
    const sections = course?.content?.filter((con) => con.type !== "FOLDER" && con.parentId === folders?.[0]?.id);

    if (sections) {
        return redirect(`/course/${courseId}/sections/${sections[0]?.id}`);
    }

    return (
        <>
            {/* <Header />
            <div className='min-h-[95dvh-80px] flex'>
                <div className='w-[30%] min-h-[100dvh-80px] lg:block hidden backdrop-blur-md fixed border-r border-black/50 dark:border-white/50'>
                    {/* <ScrollArea> */}
            {/* <FolderView courseId={courseId} courseContent={course?.content} /> */}
            {/* <ScrollBar orientation="vertical" /> */}
            {/* </ScrollArea> 
                </div>
                <div className='w-full lg:pl-[30%] h-[95dvh-100px]'>
                    <PageContainer scrollable={true}>
                        {/* <CourseDetails course={course} /> 
                    </PageContainer>
                </div>
            </div > */}
        </>
    )
}

export default CourseSectionsPage;