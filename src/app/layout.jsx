import './globals.css';
import { MenuLayout } from '@/components/menu/MenuLayout';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function RootLayout({ children }) {
    return (
        <html lang='pt-br'>
            <body className='antialiased h-[100vh]'>
                <MenuLayout />
                <div className='h-full'>
                    {children}
                </div>
            </body>
        </html>
    );
}
