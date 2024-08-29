"use client"

import { Header } from '@/components/header';
import { Profile } from '@/components/profile/profile';
import React, { useState } from 'react'

const ProfilePage = () => {
    const user = {};
    return (
        <div>
            <Header />
            <div className='h-full w-full'>
                <Profile user={user} />
            </div>
        </div>
    )
}

export default ProfilePage;