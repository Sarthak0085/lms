import { Header } from '@/components/layout/header';
import { Profile } from '@/components/profile/profile';
import { currentUser } from '@/lib/auth';

const ProfilePage = async () => {
    const user = await currentUser();
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