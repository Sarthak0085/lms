import { EditCourse } from '@/components/admin/course/edit-course';
import { PageContainer } from '@/components/admin/layout/page-container';
import { domain } from '@/lib/domain';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Admin Update Course",
    description: "Admin can Update course here",
    keywords: "NextJs, MERN, ReactJs",
}

interface EditCoursePageProps {
    params: { courseId: string };
}

const EditCoursePage = async ({ params: { courseId } }: EditCoursePageProps) => {
    const response = await fetch(`${domain}/api/admin/course/${courseId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return (
        <PageContainer scrollable={true}>
            <EditCourse data={data} />
        </PageContainer>
    )
}

export default EditCoursePage;