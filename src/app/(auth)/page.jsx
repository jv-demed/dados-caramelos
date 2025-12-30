'use client'
import { useEffect, useState } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { useDataList } from '@/hooks/useDataList';
import { ICONS } from '@/assets/icons';
import { Box } from '@/components/containers/Box';
import { Main } from '@/components/containers/Main';
import { TextInput } from '@/components/inputs/TextInput';
import { ActionBtn } from '@/components/elements/ActionBtn';
import { SpinLoader } from '@/components/elements/SpinLoader';
import { ProductBox } from '@/components/products/ProductBox';
import { ProductForm } from '@/components/products/ProductForm';

export default function Home() {

    const isMobile = useMedia(650);

    const products = useDataList({
        table: 'products',
    });
    // console.log(products);

    const [search, setSearch] = useState('');
    const [productsFiltered, setProductsFiltered] = useState([]);

    useEffect(() => {
        setProductsFiltered(products.list);
    }, [products.list]);

    useEffect(() => {
        if(search.length === 0) {
            setProductsFiltered(products.list);
        } else {
            const filtered = products.list.filter(product => 
                product.name.toLowerCase().includes(search.toLowerCase())
            );
            setProductsFiltered(filtered);
        }
    }, [search]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <Main>
            <Box>
                <div className='flex flex-col gap-4 w-full'>
                    <div className='flex gap-2'>
                        <TextInput placeholder='Buscar...'
                            value={search}
                            setValue={e => setSearch(e)}
                            width='100%'
                        />
                        <ActionBtn 
                            icon={ICONS.plus}
                            width='60px'
                            action={() => setIsModalOpen(true)}
                            disabled
                        />
                    </div>
                    <ul className='flex flex-col gap-2 w-full'>
                        {products.loading ? <SpinLoader /> : <>
                            {productsFiltered.map(product => (
                                <li key={product.id}>
                                    <ProductBox 
                                        isMobile={isMobile}
                                        product={product} 
                                        refresh={products.refresh}
                                        openEditModal={() => {
                                            setSelectedProduct(product);
                                            setIsModalOpen(true);
                                        }}
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
            <ProductForm
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setSelectedProduct(null);
                }}
                onSuccess={products.refresh}
                product={selectedProduct}
            />
        </Main>
    );
}