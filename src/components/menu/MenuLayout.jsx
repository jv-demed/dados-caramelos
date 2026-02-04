'use client'
import { useMedia } from '@/hooks/useMedia';
import { usePathname, useRouter } from 'next/navigation';
import { logout } from '@/supabase/auth';
import { ICONS } from '@/assets/icons';
import { MEDIA } from '@/assets/media';
import { WebAside } from '@/components/menu/WebAside';
import { MobileHeader } from '@/components/menu/MobileHeader';

export function MenuLayout(){

    const router = useRouter();
    const isMobile = useMedia(MEDIA.mobile);
    const pathname = usePathname();
    const hideMenu = pathname === '/login';

    const menuItems = [
        {
            name: 'Loja',
            url: '/',
            icon: ICONS.store
        },{
            name: 'Sair',
            url: '/login',
            icon: ICONS.logout,
            action: async () => await logout()
        }
    ];

    if(hideMenu) return;

    if(isMobile) {
        return <MobileHeader 
            router={router}
            items={menuItems} 
        />;
    } else {
        return <WebAside 
            router={router}
            items={menuItems} 
        />;
    }
}