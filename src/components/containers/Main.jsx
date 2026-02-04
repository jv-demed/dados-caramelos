import { useMedia } from '@/hooks/useMedia';
import { MEDIA } from '@/assets/media';

export function Main({ 
    children, 
    isMenuHidden = false
}){

    const isMobile = useMedia(MEDIA.mobile);

    return (
        <main className={`
            flex flex-col items-center justify-between
            min-h-full
            ${isMenuHidden 
                ? isMobile ? 'px-[2%] py-4' : 'px-[15%] py-10'
                : isMobile ? 'mt-[70px] px-[2%] py-4' : 'ml-[50px] px-[15%] py-10'}
        `}>
            {children}
        </main>
    )
}