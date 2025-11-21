import { useMedia } from '@/hooks/useMedia';

export function Main({ 
    children, 
    isWithoutMenu = false
}){

    const isMobile = useMedia(650);

    return (
        <main className={`
            flex flex-col items-center justify-between
            bg-[#eab74a] min-h-full
            ${isWithoutMenu 
                ? isMobile ? 'px-[2%] py-4' : 'px-[15%] py-10'
                : isMobile ? 'mt-[70px] px-[2%] py-4' : 'ml-[50px] px-[15%] py-10'
            }
        `}>
            {children}
        </main>
    )
}