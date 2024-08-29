import React from 'react'
import DashboardHero from '../components/Admin/Dashboard/DashboardHero'

const AdminPage = () => {
    return (
        <div>
            <div className='flex h-[200vh]'>
                <div className='1500:w-[16%] w-1/5'>
                    {/* <AdminSidebar /> */}
                </div>
                <div className='w-[85%]'>
                    <DashboardHero isDashboard={true} />
                </div>
            </div>
        </div>
    )
}

export default AdminPage;