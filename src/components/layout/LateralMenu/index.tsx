'use client';

import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/supabase/auth';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { navItems, logoutItem } from '@/data/navMenu';

export function LateralMenu() {
    const router = useRouter();
    const pathname = usePathname();

    const openKeys = navItems.map((item) => item.key);

    const handleClick: MenuProps['onClick'] = async (e) => {
        if (e.key === '/login') {
            await logout();
        }

        if (e.key.startsWith('/')) {
            router.push(e.key);
        }
    };

    return (
        <div className="bg-primary h-screen w-64 flex flex-col py-4">
            <Menu
                mode="inline"
                defaultOpenKeys={openKeys}
                selectedKeys={[pathname]}
                onClick={handleClick}
                items={navItems}
                className="border-none flex-1"
            />

            <Menu
                mode="inline"
                selectable={false}
                onClick={handleClick}
                items={[logoutItem]}
                className="border-none"
            />
        </div>
    );
}
