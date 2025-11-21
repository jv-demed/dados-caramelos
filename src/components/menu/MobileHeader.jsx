import { useState } from 'react';
import { ICONS } from '@/assets/icons';

export function MobileHeader({ router, items }){

    const [isOpen, setIsOpen] = useState(false);

    return(
        <header className={`
            flex items-center justify-end 
            fixed top-0 left-0 right-0 
            h-[70px] px-5 z-10
            bg-[#1e95b3] text-white 
        `}>
            <div className='text-4xl'>
                {isOpen 
                    ? <ICONS.close onClick={() => setIsOpen(false)} />
                    : <ICONS.menuHamburger onClick={() => setIsOpen(true)} />
                }
            </div>
            <nav className={`
                fixed top-[70px] bottom-0 right-0 w-full 
                bg-[#1e95b3] text-white 
                flex flex-col transition-transform duration-150 
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <ul className='flex flex-col gap-3 p-10 text-[1.4rem]'>
                    {items.map(item => {
                        return(
                            <li key={item.name}
                                className='flex items-center gap-3 border-b border-white pb-2 cursor-pointer'
                                onClick={async () => {
                                    item.action && item.action();
                                    router.push(item.url);
                                    setIsOpen(false);
                                }}
                            >
                            <div className='text-2xl'>
                                    {item.icon && <item.icon />}
                                </div>
                                <span>{item.name}</span>
                            </li>
                        )                
                    })}
                </ul>
            </nav>
        </header>
    )
}