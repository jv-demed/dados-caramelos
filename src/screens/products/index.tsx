'use client';
import { useState } from 'react';
import { useDataList } from '@/hooks/useDataList';

import { Table, Empty, Input, Button, Modal } from 'antd';
import { ProductForm } from '@/screens/products/ProductModal';
import { deleteProduct } from '@/services/productsService';
import { toggleProductAvailability as toggleService } from '@/services/productsService';
import { ProductsMobileList } from './ProductsMobileList';
import { useProductsFilters } from '@/hooks/useProductsFilters';
import { useProductsColumns } from '@/hooks/useProductsColumns';

const { Search } = Input;

export function ProductsPage() {
    const products = useDataList({ table: 'products' });

    const [search, setSearch] = useState('');
    const [tableFilters, setTableFilters] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { typeFilters, availabilityFilters, filteredProducts, typeColors } = useProductsFilters(
        products.list,
        search,
        tableFilters
    );

    const columns = useProductsColumns({
        typeFilters,
        availabilityFilters,
        typeColors,
        onEdit: handleOpenEditModal,
        onDelete: handleOpenDeleteModal,
        onToggleAvailability: toggleProductAvailability,
    });

    function handleOpenCreateModal() {
        setSelectedProduct(null);
        setIsModalOpen(true);
    }

    function handleOpenEditModal(product) {
        setSelectedProduct(product);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedProduct(null);
    }

    function handleOpenDeleteModal(product) {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: (
                <>
                    Você realmente deseja excluir o produto <strong>{product.name}</strong>? Essa
                    ação não poderá ser desfeita.
                </>
            ),
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            centered: true,
            async onOk() {
                const result = await deleteProduct(product);
                if (!result) return;

                products.refresh();
            },
        });
    }

    async function toggleProductAvailability(product) {
        const result = await toggleService(product);
        if (result) {
            products.refresh();
        }
    }

    return (
        <>
            <ProductForm
                open={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={products.refresh}
                product={selectedProduct}
            />
            <h1 className="text-xl md:text-2xl font-semibold">Produtos</h1>
            <div className="w-full flex gap-4 md:gap-8">
                <Search
                    placeholder="Buscar produto pelo nome"
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
                <Button onClick={handleOpenCreateModal} type="primary">
                    Adicionar Produto
                </Button>
            </div>
            <Table
                rowKey="id"
                dataSource={filteredProducts}
                columns={columns}
                loading={products.loading}
                pagination={{ pageSize: 10 }}
                onChange={(_, filters) => {
                    setTableFilters(filters);
                }}
                locale={{
                    emptyText: <Empty description="Nenhum produto encontrado" />,
                }}
                className="w-full hidden md:table"
            />
            <ProductsMobileList
                products={filteredProducts}
                typeColors={typeColors}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
                toggleProductAvailability={toggleProductAvailability}
            />
        </>
    );
}
