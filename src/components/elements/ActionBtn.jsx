import { useState } from 'react';
import { SpinLoader } from '@/components/elements/SpinLoader';

export function ActionBtn({ 
    text,
    type, 
    action,
    disabled,
    reverse,
    bg = 'var(--color-primary)', 
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
                rounded-full h-12 px-2 text-lighttext
                hover:brightness-90
                focus:outline-none focus:ring-2
                focus:ring-primary focus:border-primary
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
                    {Icon && <span className='text-2xl text-lighttext'>
                        <Icon />    
                    </span>}
                </> 
                : <SpinLoader color='var(--color-lighttext)' />}
        </button>
    )
}