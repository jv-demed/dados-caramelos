'use client'
import { useEffect, useState } from 'react';
import { createEmptyProduct, createProduct, deleteProduct, updateProduct } from '@/services/productsService';
import { ProductType } from '@/models/ProductType';
import { ProductMaterial } from '@/models/ProductMaterial';
import { Modal } from '@/components/containers/Modal';
import { TextInput } from '@/components/inputs/TextInput';
import { TrashBtn } from '@/components/elements/TrashBtn';
import { ActionBtn } from '@/components/elements/ActionBtn';
import { MoneyInput } from '@/components/inputs/MoneyInput';
import { SelectInput } from '@/components/inputs/SelectInput';
import { CheckboxInput } from '@/components/inputs/CheckboxInput';

export function ProductForm({ 
    open, 
    onClose, 
    onSuccess, 
    product 
}) {

    const [productModel, setProductModel] = useState(createEmptyProduct());

    useEffect(() => {
        setProductModel(product ? { ...product } : createEmptyProduct());
    }, [product]);

    async function onSave() {
        const result = product?.id
            ? await updateProduct(productModel)
            : await createProduct(productModel)
        if(!result) return;
        await onSuccess();
        onClose();
    };

    async function onDelete() {
        const result = await deleteProduct(productModel);
        if(!result) return;
        await onSuccess();
        onClose();
    };

    return (
        <Modal title='Produto'
            open={open} 
            onClose={onClose}
        >
            <div className='flex flex-col gap-3'>
                <TextInput title='Nome'
                    value={productModel?.name}
                    setValue={e => setProductModel({ ...productModel, name: e })}
                />
                <SelectInput title='Categoria'
                    value={ProductType.toUpper(productModel?.type)}
                    setValue={e => setProductModel({ ...productModel, type: e })}
                    options={ProductType.options()}
                />
                <SelectInput title='Material'
                    value={ProductMaterial.toUpper(productModel?.material)}
                    setValue={e => setProductModel({ ...productModel, material: e })}
                    options={ProductMaterial.options()}
                    isVisible={ProductType.toUpper(productModel?.type) === ProductType.CAMISETA}
                />
                <div className={`flex justify-center gap-2`}>
                    <MoneyInput title='Preço'
                        value={productModel?.price}
                        setValue={e => setProductModel({ ...productModel, price: e })}
                    />
                    <div className='flex items-end justify-end w-full pb-3'>
                        <CheckboxInput title='Disponibilidade'
                            value={productModel?.available}
                            setValue={e => setProductModel({ ...productModel, available: e })}
                        />
                    </div>
                </div>
                <TextInput title='Link de Imagem'
                    value={productModel?.img_link}
                    setValue={e => setProductModel({ ...productModel, img_link: e })}
                />
                <div className='flex justify-end gap-2 mt-4'>
                    <TrashBtn 
                        onClick={onDelete} 
                        isVisible={productModel.id}
                    />
                    <ActionBtn text='Cancelar'
                        action={onClose}
                        bg='var(--error)'
                    />
                    <ActionBtn text='Salvar' 
                        action={onSave}
                    />
                </div>
            </div>
        </Modal>
    );
}