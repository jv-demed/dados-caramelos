'use client'
import { useMedia } from '@/hooks/useMedia';
import { useRouter } from 'next/navigation';
import { ICONS } from '@/assets/icons';
import { WebAside } from '@/components/menu/WebAside';
import { MobileHeader } from '@/components/menu/MobileHeader';

export function MenuLayout(){

    const router = useRouter();
    const isMobile = useMedia(650);

    const menuItems = [
        {
            name: 'Loja',
            url: '/',
            icon: ICONS.store
        }
    ];

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