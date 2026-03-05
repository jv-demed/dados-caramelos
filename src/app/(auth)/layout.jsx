import '@/app/globals.css';
import { TopMenu } from '@/components/layout/TopMenu';
import { LateralMenu } from '@/components/layout/LateralMenu';
import { UserProvider } from '@/providers/UserProvider';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function Layout({ children }) {
    return (
        <UserProvider>
            <TopMenu />
            <main className="flex pt-16.5 md:p-0 md:h-screen">
                <div className="hidden md:block">
                    <LateralMenu />
                </div>
                <section className="w-full overflow-y-auto flex flex-col gap-4 md:gap-6 px-5 md:p-10 lg:p-16">
                    {children}
                </section>
            </main>
        </UserProvider>
    );
}
