'use client'
import { useMedia } from '@/hooks/useMedia';
import { useDataList } from '@/hooks/useDataList';
import { Box } from '@/components/containers/Box';
import { Main } from '@/components/containers/Main';
import { SpinLoader } from '@/components/elements/SpinLoader';
import { ProductBox } from '@/components/products/ProductBox';
import { TextInput } from '@/components/inputs/TextInput';
import { useEffect, useState } from 'react';

export default function Home() {

    const isMobile = useMedia(650);

    const products = useDataList({
        table: 'products',
    });

    const [search, setSearch] = useState('');
    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        if(search.length === 0) {
            setProductsFiltered(products.list);
            return;
        } else {
            const filtered = products.list.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase())
            );
            setProductsFiltered(filtered);
        }
    }, [products.list, search]);

    return (
        <Main>
            <Box>
                <div className='flex flex-col gap-4 w-full'>
                    <TextInput placeholder='Buscar...'
                        value={search}
                        setValue={e => setSearch(e)}
                        width='100%'
                    />
                    <ul className='flex flex-col gap-2 w-full'>
                        {products.loading ? <SpinLoader /> : <>
                            {productsFiltered.map(product => (
                                <li key={product.id}>
                                    <ProductBox 
                                        isMobile={isMobile}
                                        product={product} 
                                        refresh={products.refresh}
                                    />
                                </li>
                            ))}
                            {productsFiltered.length === 0 && <li>
                                Nenhum produto encontrado.
                            </li>}
                        </>
                        }
                    </ul>
                </div>
            </Box>
        </Main>
    );
}