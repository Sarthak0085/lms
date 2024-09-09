import { CourseDetailsPage } from '@/components/course/course-details-page';
import { domain } from '@/lib/domain';
import React from 'react'

interface CoursePageProps {
    params: { courseId: string };
}

const CoursePage = async ({ params: { courseId } }: CoursePageProps) => {
    const response = await fetch(`${domain}/api/courses/${courseId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const course = await response.json();

    return (
        <>
            <CourseDetailsPage course={course} />
        </>
    )
}

export default CoursePage;