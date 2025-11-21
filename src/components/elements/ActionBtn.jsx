import { useState } from 'react';
import { SpinLoader } from '@/components/elements/SpinLoader';

export function ActionBtn({ 
    text,
    type, 
    action,
    disabled,
    reverse,
    bg = '#1e95b3', 
    width = '100%',
    icon: Icon
}){

    const [isLoading, setIsLoading] = useState(false);

    async function handleAction() {
        setIsLoading(true);
        action && await action();
        setIsLoading(false);
    }

    return(
        <button type={type || 'button'}
            disabled={disabled || isLoading}
            onClick={handleAction}
            className={`
                flex items-center justify-center gap-2.5
                rounded-full h-12 px-2 text-white
                hover:brightness-90
                focus:outline-none focus:ring-2
                focus:ring-[#1e95b3] focus:border-[#1e95b3]
            `}
            style={{ 
                background: disabled ? 'gray' : bg,
                cursor: disabled ? 'not-allowed' : 'pointer',
                flexDirection: reverse ? 'row-reverse' : 'row',
                width: width 
            }}
        >
            {!isLoading 
                ? <>
                    {text && <span>{text}</span>}
                    {Icon && <span className='text-2xl'>
                        <Icon />    
                    </span>}
                </> 
                : <SpinLoader color='white' />}
        </button>
    )
}