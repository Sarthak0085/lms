import { ThemeSwitcher } from '@/components/layout/theme-switcher';
import { MobileSidebar } from './mobile-sidebar';

export const Header = () => {
    return (
        <header className="sticky inset-x-0 top-0 bg-transparent backdrop-blur-md w-full border-b border-green-500">
            <nav className="flex items-center justify-between px-4 py-2 lg:justify-end">
                <div className={'block lg:!hidden'}>
                    <MobileSidebar />
                </div>
                <div className="flex items-center gap-2">
                    {/* <UserNav /> */}
                    <ThemeSwitcher />
                </div>
            </nav>
        </header>
    );
}