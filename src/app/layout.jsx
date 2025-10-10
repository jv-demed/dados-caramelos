import { Aside } from '@/components/menu/Aside';
import './globals.css';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function RootLayout({ children }) {
    return (
        <html lang='pt-br'>
            <body className='antialiased h-[100vh]'>
                <Aside />
                <div className='h-full ml-[50px]'>
                    {children}
                </div>
            </body>
        </html>
    );
}
