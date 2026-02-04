'use client'
import { useMemo, useState } from 'react';
import { useMedia } from '@/hooks/useMedia';
import { useDataList } from '@/hooks/useDataList';
import { ICONS } from '@/assets/icons';
import { MEDIA } from '@/assets/media';
import { Box } from '@/components/containers/Box';
import { Main } from '@/components/containers/Main';
import { TextInput } from '@/components/inputs/TextInput';
import { ActionBtn } from '@/components/elements/ActionBtn';
import { SpinLoader } from '@/components/elements/SpinLoader';
import { ProductBox } from '@/components/products/ProductBox';
import { ProductForm } from '@/components/products/ProductForm';

export default function Home() {

    const isMobile = useMedia(MEDIA.mobile);

    const products = useDataList({ table: 'products' });

    const [search, setSearch] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const productsFiltered = useMemo(() => {
        if(!search) return products.list;
        const searchLower = search.toLowerCase();
        return products.list.filter(product =>
            product.name.toLowerCase().includes(searchLower)
        )
    }, [search, products.list]);

    function openCreateModal() {
        setSelectedProduct(null);
        setIsModalOpen(true);
    };

    function openEditModal(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    function closeModal() {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

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
                            action={openCreateModal}
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
                                        openEditModal={() => openEditModal(product)}
                                    />
                                </li>
                            ))}
                            {productsFiltered.length === 0 && <li>
                                Nenhum produto encontrado.
                            </li>}
                        </>}
                    </ul>
                </div>
            </Box>
            <ProductForm
                open={isModalOpen}
                onClose={closeModal}
                onSuccess={products.refresh}
                product={selectedProduct}
            />
        </Main>
    );
}