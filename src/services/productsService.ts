import { createRecord, deleteRecord, updateRecord } from '@/supabase/crud';
import { ProductType } from '@/models/ProductType';
import { AlertService } from '@/services/AlertService';
import { IProduct } from '@/types/Product';

const alert = new AlertService();

export function createEmptyProduct() {
    return {
        id: 0,
        name: '',
        type: '',
        material: '',
        price: 0,
        available: false,
        size: false,
        img_link: '',
    } as IProduct;
}

export async function createProduct(newProduct: IProduct) {
    if (!verifyProduct(newProduct)) return;
    const { id, ...productToInsert } = newProduct;
    const normalizedProduct = normalize(productToInsert);
    return await createRecord('products', normalizedProduct);
}

export async function updateProduct(product: IProduct) {
    if (!product?.id) return;
    if (!verifyProduct(product)) return;
    const normalizedProduct = normalize(product);
    return await updateRecord('products', product.id, normalizedProduct);
}

export async function toggleProductAvailability(product: IProduct) {
    if (!product?.id) return;
    return await updateRecord('products', product.id, {
        available: !product.available,
    });
}

export async function deleteProduct(product: IProduct) {
    if (!product.id) {
        alert.error('O produto não foi encontrado');
        return;
    }
    return await deleteRecord('products', product.id);
}

function normalize(product: IProduct) {
    const typeUpper = product.type?.toUpperCase();
    const isCamiseta = typeUpper === ProductType.CAMISETA.value;

    return {
        ...product,
        name: product.name?.trim(),
        img_link: product.img_link?.trim(),
        type: product.type?.toLowerCase(),
        material: isCamiseta ? product.material?.toLowerCase() : null,
        size: isCamiseta ? true : null,
    };
}

function verifyProduct(product: IProduct) {
    if (!product.name) {
        alert.error('O nome do produto é obrigatório');
        return false;
    }
    if (!product.type) {
        alert.error('A categoria do produto é obrigatória');
        return false;
    }
    const type = product.type?.toUpperCase();
    if (type === ProductType.CAMISETA.value && !product.material) {
        alert.error('O material do produto é obrigatório');
        return false;
    }
    if (product.price == null || product.price < 0) {
        alert.error('O preço do produto é obrigatório e deve ser positivo');
        return false;
    }
    if (!product.img_link) {
        alert.error('O link da imagem do produto é obrigatório');
        return false;
    }
    return true;
}
