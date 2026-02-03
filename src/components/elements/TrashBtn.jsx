import { useState } from 'react';
import { ICONS } from '@/assets/icons';
import { SpinLoader } from '@/components/elements/SpinLoader';

export function TrashBtn({ 
    onClick = async () => {},
    disabled,
    width = '60px',
    isVisible = true,
}){

    const [isLoading, setIsLoading] = useState(false);

    async function handleAction() {
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
    }

    return(
        <button type='button'
            title='Excluir'
            disabled={disabled || isLoading}
            onClick={handleAction}
            className={`
                flex items-center justify-center gap-2.5
                rounded-full h-12 px-2 
                text-error text-2xl
                hover:brightness-90
                focus:outline-none focus:ring-2
                focus:ring-error focus:border-error
            `}
            style={{ 
                cursor: disabled ? 'not-allowed' : 'pointer',
                display: isVisible ? 'flex' : 'none',
                width: width 
            }}
        >
            {!isLoading 
                ? <ICONS.trash />
                : <SpinLoader 
                    color='var(--error)' 
                    width='1.5rem'
                />}
        </button>
    )
}