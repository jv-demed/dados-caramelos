import '@/app/globals.css';
import { MenuLayout } from '@/components/menu/MenuLayout';
import { UserProvider } from '@/providers/UserProvider';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function Layout({ children }) {
    return (
        <UserProvider>
            <MenuLayout />
            <div className='h-full'>
                {children}
            </div>
        </UserProvider>
    );
}
