// import { users } from '@/constants/data';

import { Breadcrumbs } from "@/components/admin/breadcrumbs";
import { PageContainer } from "@/components/admin/layout/page-container";

const breadcrumbItems = [
    { title: 'Dashboard', link: '/admin' },
    { title: 'User', link: '/admin/user' }
];

const UsersPage = () => {
    return (
        <PageContainer>
            <div className="space-y-2">
                <Breadcrumbs items={breadcrumbItems} />
                {/* <UserClient data={users} /> */}
            </div>
        </PageContainer>
    );
}

export default UsersPage;