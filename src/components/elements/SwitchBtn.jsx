'use client'
import { useState } from 'react';
import { SpinLoader } from '@/components/elements/SpinLoader';

export function SwitchBtn({
    value = false,
    onChange,
    options = ['Off', 'On'],
}) {

    const [active, setActive] = useState(value);
    const [isLoading, setIsLoading] = useState(false);

    async function toggle() {
        if (isLoading) return;
        setIsLoading(true);
        const newValue = !active;
        setActive(newValue);
        if (onChange) await onChange(newValue);
        setIsLoading(false);
    }

    return (
        <div className='relative w-fit'>
            <button type='button'
                onClick={toggle}
                disabled={isLoading}
                className={`
                    flex items-center justify-between
                    rounded-full border border-zinc-300 overflow-hidden
                    transition-colors
                    ${isLoading ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer'}
                `}
            >
                <span className={`
                    px-3 py-1 text-xs font-medium transition-all
                    ${!active ? 'bg-white text-zinc-700' : 'text-zinc-500'}
                `}>
                    {options[0]}
                </span>
                <span className={`
                    px-3 py-1 text-xs font-medium transition-all
                    ${active ? 'bg-white text-[#1e95b3]' : 'text-zinc-500'}
                `}>
                    {options[1]}
                </span>
            </button>
            {isLoading && <div  className='
                absolute inset-0 flex items-center justify-center
                bg-white/60 rounded-full
            '>
                <SpinLoader size={18} color='#1e95b3' />
            </div>}
        </div>
    );
}