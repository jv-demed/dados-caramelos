'use client'
import { useState } from 'react';
import { ICONS } from '@/assets/icons';

export function PasswordInput({ 
    title, 
    value, 
    setValue,
    placeholder,
    disabled,
    width = '100%'
}){

    const [passMode, setPassMode] = useState(true);

    return(
        <div className={`
            flex flex-col gap-0.5
            w-full relative
        `}>
            {title && <span>{title}:</span>}
            <div className='relative' style={{ width }}>
                <input name={title || 'input-label'}
                    type={passMode ? 'password' : 'text'}
                    placeholder={placeholder || '...'}
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    disabled={disabled}
                    className={`
                        flex items-center
                        w-full h-12 px-6 text-xl
                        border border-gray-500 rounded-full  
                        hover:border-[#1e95b3]
                        focus:outline-none focus:ring-2
                        focus:ring-[#1e95b3] focus:border-[#1e95b3]
                    `}
                />
                <button type='button' 
                    onClick={() => setPassMode(!passMode)}
                    className={`
                        absolute right-2 top-1/2 
                        transform -translate-y-1/2 
                        rounded cursor-pointer p-1 text-xl
                        hover:text-[#1e95b3] 
                        focus:outline-none focus:ring-2 focus:ring-[#1e95b3]
                    `}
                >
                    {passMode ? <ICONS.eyeOff /> : <ICONS.eye />}
                </button>
            </div>
        </div>
    )
};