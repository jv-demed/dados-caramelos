'use client'
import { useState } from 'react';
import { ICONS } from '@/assets/icons';

export function QuantityInput({ 
    value = 0, 
    onChange 
}) {

    const [quantity, setQuantity] = useState(value);

    const updateQty = (newValue) => {
        if(newValue < 0) newValue = 0;
        setQuantity(newValue);
        if(onChange) onChange(newValue);
    };

    return (
        <div className={`
            flex items-center w-fit
            bg-white rounded-full overflow-hidden
        `}>
            <button type='button'
                className={`
                    px-3 py-1 text-xs font-medium 
                    hover:bg-zinc-100 active:bg-zinc-200 transition-colors    
                `}
                onClick={() => updateQty(quantity - 1)}
            >
                <ICONS.minus />
            </button>
            <input type='number'
                value={quantity}
                onChange={(e) => updateQty(Number(e.target.value))}
                className={`
                    w-12 text-center outline-none border-x border-zinc-200
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                    [appearance:textfield]
                `}
                min={0}
            />
            <button type='button'
                className={`
                    px-3 py-1 text-xs font-medium 
                    hover:bg-zinc-100 active:bg-zinc-200 transition-colors    
                `}
                onClick={() => updateQty(quantity + 1)}
            >
                <ICONS.plus />
            </button>
        </div>
    );
}