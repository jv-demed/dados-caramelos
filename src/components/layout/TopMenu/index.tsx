'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/supabase/auth';
import { Drawer } from 'antd';
import { Menu } from 'lucide-react';
import { navItems, logoutItem } from '@/data/navMenu';

export function TopMenu() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    async function handleNavigate(key: string) {
        if (key === '/login') {
            await logout();
        }

        router.push(key);
        setOpen(false);
    }

    return (
        <>
            <div className="md:hidden flex items-center justify-end p-4 z-50">
                <button onClick={() => setOpen(true)}>
                    <Menu size={28} />
                </button>
            </div>
            <Drawer
                placement="right"
                open={open}
                onClose={() => setOpen(false)}
                closable={false}
                width={260}
            >
                <div className="flex flex-col gap-2">
                    {[...navItems, logoutItem].map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleNavigate(item.key as string)}
                            className={`flex items-center gap-3 p-3 rounded-md text-left hover:bg-gray-100 ${
                                pathname === item.key ? 'bg-gray-100 font-medium' : ''
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </div>
            </Drawer>
        </>
    );
}
