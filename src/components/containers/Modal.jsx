'use client'
import { ICONS } from '@/assets/icons';

export function Modal({ 
    open, 
    onClose, 
    title, 
    children 
}) {

    if(!open) return null;

    return (
        <div className={`
            flex items-center justify-center
            fixed inset-0 z-50 
        `}>
            <div className='absolute inset-0 bg-black/50'
                onClick={onClose}
            />
            <div className={`
                relative bg-white 
                rounded-4xl w-full max-w-md z-10    
            `}>
                <header className={`
                    flex items-center justify-between gap-2
                    px-4 py-3  
                `}>
                    <h3 className='text-darktext border-b w-full'>
                        {title}
                    </h3>
                    <button   
                        onClick={onClose}  
                        className={`
                            text-error text-xl rounded cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-error
                        `}
                    >
                        <ICONS.close />
                    </button>
                </header>
                <div className='px-4 pb-4'>
                    {children}
                </div>
            </div>
        </div>
    );
}