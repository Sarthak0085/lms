import React from 'react';
import DashboardHeader from '@/components/admin/dashboard/dashboard-header';
import { Metadata } from 'next';
import { CreateCourse } from '@/components/admin/course/create-course';

export const metadata: Metadata = {
    title: "Admin Create Course",
    description: "Admin can create course here",
    keywords: "NextJs, MERN, ReactJs",
}

const page = () => {
    return (
        <div className='flex h-[200vh]'>
            <div className='1500px:w-[16%] w-1/5'>
                {/* <AdminSidebar /> */}
            </div>
            <div className='w-[85%]'>
                <DashboardHeader />
                <CreateCourse />
            </div>
        </div>
    )
}

export default page