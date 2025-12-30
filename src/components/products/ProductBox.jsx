import Image from 'next/image';
import { toggleProductAvailability } from '@/services/productsService';
import { ICONS } from '@/assets/icons';
import { SwitchBtn } from '@/components/elements/SwitchBtn';

export function ProductBox({ 
    isMobile, 
    product,
    refresh,
    openEditModal
}){
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
                <div className='flex justify-between gap-2'>
                    <div className='flex flex-col'>
                        <span className='text-sm'>
                            {product.type}
                        </span>
                        <span className={`block ${!isMobile && 'text-xl'} truncate`}>
                            {product.name}
                        </span>
                    </div>
                    {isMobile && <div 
                        onClick={openEditModal}
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        <span className='underline text-xs'>
                            Editar
                        </span>
                        <ICONS.edit/>
                    </div>}
                </div>
                <div className='flex flex-col items-end gap-2'>
                    {!isMobile && <div 
                        onClick={openEditModal}
                        className='flex items-center gap-2 cursor-pointer'
                    >
                        <span className='underline'>
                            Editar
                        </span>
                        <ICONS.edit/>
                    </div>}
                    <SwitchBtn 
                        value={product.available}
                        options={['Esgotado', 'Disponível']}
                        onChange={async () => {
                            const result = await toggleProductAvailability(product);
                            if(result) {
                                refresh();
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}