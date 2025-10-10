'use client'
import { Box } from '@/components/containers/Box';
import { SpinLoader } from '@/components/elements/SpinLoader';
import { ProductBox } from '@/components/products/ProductBox';
import { useDataList } from '@/hooks/useDataList';

export default function Home() {

    const products = useDataList({
        table: 'products',
    });

    return (
        <main className={`
            flex flex-col items-center justify-between
            bg-[#eab74a] min-h-full px-[15%] py-10
        `}>
            <Box>
                <ul className='flex flex-col gap-2 w-full'>
                    {products.loading ? <SpinLoader /> : 
                        products.list.map(product => (
                            <li key={product.id}>
                                <ProductBox product={product} />
                            </li>
                        ))
                    }
                </ul>
            </Box>
        </main>
    );
}