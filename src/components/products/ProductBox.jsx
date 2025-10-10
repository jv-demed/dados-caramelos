import Image from 'next/image';

export function ProductBox({ product }) {
    return (
        <div className={`
            flex items-start gap-4
            rounded-4xl overflow-hidden
            bg-zinc-100
        `}>
            <div className='relative w-[100px] h-[100px]' >
                <Image 
                    src={product.img_link}
                    alt='Card frame'
                    className='object-cover'
                    fill
                />
            </div>
            <div className={`
                flex
                border py-2
            `}>
                {product.name}
            </div>
        </div>
    )
}