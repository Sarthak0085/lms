import { User } from "next-auth"
import { useEffect, useState } from "react";
import { ExtendCourse } from "@/types";
import CourseCard from "@/components/course/course-card";

export const CourseLists = ({ user }: { user?: User }) => {
    const [courses, setCourses] = useState<ExtendCourse[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const fetchData = () => {
            fetch(`/api/${user?.id}/purchased`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => res.json())
                .then((data) => {
                    setCourses(data?.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                })
        }

        fetchData();
    }, []);

    if (isLoading) {
        // To be implemented
    }

    return (
        courses?.map((course: ExtendCourse) => (
            <CourseCard key={course?.id} item={course} isProfile={true} />
        ))
    )
}