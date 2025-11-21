'use client'
import { useState } from 'react';

export function WebAside({ router, items }){

    const [mouseOver, setMouseOver] = useState(false);
    
    return(
        <aside 
            className={`
                fixed bottom-0 top-0 z-10 
                bg-[#1e95b3]
                transition-all duration-100 
                ${mouseOver ? 'w-[280px]' : 'w-[50px]'}
            `}
            onMouseOut={() => setMouseOver(false)}
            onMouseOver={() => setMouseOver(true)}
        >
            <nav className={`
                flex flex-col items-center justify-between 
                text-white h-full py-12
            `}>
                <ul className='flex flex-col gap-[14px]'>
                    {items.map(item => (
                        <li key={item.name} 
                            className='flex cursor-pointer items-center gap-[10px]'
                            onClick={() => {
                                item.action && item.action();
                                router.push(item.url);
                            }}
                        >
                            <div className='flex text-[1.5rem]'>
                                {item.icon && <item.icon />}
                            </div>
                            <span className={`${mouseOver ? 'inline' : 'hidden'}`}>
                                {item.name}
                            </span>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}