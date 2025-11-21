'use client'
import { useMedia } from '@/hooks/useMedia';
import { useDataList } from '@/hooks/useDataList';
import { Box } from '@/components/containers/Box';
import { Main } from '@/components/containers/Main';
import { SpinLoader } from '@/components/elements/SpinLoader';
import { ProductBox } from '@/components/products/ProductBox';

export default function Home() {

    const isMobile = useMedia(650);

    const products = useDataList({
        table: 'products',
    });

    return (
        <Main>
            <Box>
                <ul className='flex flex-col gap-2 w-full'>
                    {products.loading ? <SpinLoader /> : 
                        products.list.map(product => (
                            <li key={product.id}>
                                <ProductBox 
                                    isMobile={isMobile}
                                    product={product} 
                                    refresh={products.refresh}
                                />
                            </li>
                        ))
                    }
                </ul>
            </Box>
        </Main>
    );
}