import Image from 'next/image';
import { toggleProductAvailability } from '@/services/productsService';
import { SwitchBtn } from '@/components/elements/SwitchBtn';

export function ProductBox({ isMobile, product }) {
    return (
        <div className={`
            flex items-center
            rounded-4xl overflow-hidden
            bg-zinc-100
        `}>
            <div className={`
                relative flex-shrink-0
                w-[100px] h-[100px]  
            `}>
                <Image 
                    src={product.img_link}
                    alt='Card frame'
                    className='object-cover'
                    fill
                />
            </div>
            <div className={`
                flex justify-between gap-2
                ${isMobile ? 'flex-col' : 'items-center'}
                w-full px-4 
            `}>
                <div className='flex flex-col'>
                    <span className='text-sm'>
                        {product.type}
                    </span>
                    <span className={`block ${!isMobile && 'text-xl'} truncate`}>
                        {product.name}
                    </span>
                </div>
                <div>
                    <SwitchBtn 
                        value={product.available}
                        options={['Esgotado', 'Disponível']}
                        onChange={async () => await toggleProductAvailability(product)}
                    />
                </div>
            </div>
        </div>
    )
}