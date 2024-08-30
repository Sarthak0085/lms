import React from 'react';
import { Metadata } from 'next';
import { CreateCourse } from '@/components/admin/course/create-course';
import { PageContainer } from '@/components/admin/layout/page-container';

export const metadata: Metadata = {
    title: "Admin Create Course",
    description: "Admin can create course here",
    keywords: "NextJs, MERN, ReactJs",
}

const CreateCoursePage = () => {
    return (
        <PageContainer scrollable={true}>
            <CreateCourse />
        </PageContainer>
    )
}

export default CreateCoursePage;