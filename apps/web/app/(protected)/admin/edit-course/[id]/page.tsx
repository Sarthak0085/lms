import { EditCourse } from '@/components/admin/course/edit-course';
import DashboardHeader from '@/components/admin/dashboard/dashboard-header';
import React from 'react';

const page = ({ params }: any) => {
    const Id = params.id;
    return (
        <div>
            <div className='flex h-[200vh]'>
                <div className='1500px:w-[16%] w-1/5'>
                    {/* <AdminSidebar /> */}
                </div>
                <div className='w-[85%]'>
                    <DashboardHeader />
                    <EditCourse id={Id} />
                </div>
            </div>
        </div>
    )
}

export default page;