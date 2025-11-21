import '@/app/globals.css';

export const metadata = {
    title: 'Dados Caramelos do Vale',
};

export default function RootLayout({ children }) {
    return (
        <html lang='pt-br'>
            <body className='antialiased h-[100vh]'>
                <div className='h-full'>
                    {children}
                </div>
            </body>
        </html>
    );
}
