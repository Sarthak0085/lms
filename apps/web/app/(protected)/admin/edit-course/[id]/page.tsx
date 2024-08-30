import { EditCourse } from '@/components/admin/course/edit-course';
import { PageContainer } from '@/components/admin/layout/page-container';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: "Admin Create Course",
    description: "Admin can create course here",
    keywords: "NextJs, MERN, ReactJs",
}

interface EditCoursePageProps {
    params: { id: string };
}

const EditCoursePage = ({ params: { id } }: EditCoursePageProps) => {
    return (
        <PageContainer scrollable={true}>
            <EditCourse id={id} />
        </PageContainer>
    )
}

export default EditCoursePage;