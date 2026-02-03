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
                        border border-border rounded-full  
                        hover:border-primary
                        focus:outline-none focus:ring-2
                        focus:ring-primary focus:border-primary
                    `}
                />
                <button type='button' 
                    onClick={() => setPassMode(!passMode)}
                    className={`
                        absolute right-2 top-1/2 
                        transform -translate-y-1/2 
                        rounded cursor-pointer p-1 text-xl
                        text-border hover:text-primary 
                        focus:outline-none focus:ring-2 focus:ring-primary
                    `}
                >
                    {passMode ? <ICONS.eyeOff /> : <ICONS.eye />}
                </button>
            </div>
        </div>
    )
};