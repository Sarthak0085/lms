"use client"

import { CourseDetailsPage } from '@/components/course/course-details-page';
import React from 'react'

interface CoursePageProps {
    params: { id: string };
}

const CoursePage = ({ params: { id } }: CoursePageProps) => {
    return (
        <>
            <CourseDetailsPage id={id} />
        </>
    )
}

export default CoursePage;