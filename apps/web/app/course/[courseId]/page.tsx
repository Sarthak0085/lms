import { getCourseById } from '@/actions/course/get-course';
import { CourseDetails } from '@/components/course/course-details';
import { Footer } from '@/components/footer';
import { Header } from '@/components/layout/header';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'

interface CoursePageProps {
    params: { courseId: string };
}

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
    throw new Error("Stripe Publishable Key is not defined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)

const CoursePage = async ({ params: { courseId } }: CoursePageProps) => {
    const data = getCourseById(courseId);

    return (
        <div>
            <Header />
            <CourseDetails
                data={data}
                stripePromise={stripePromise}
            />
            <Footer />
        </div>
    )
}

export default CoursePage;