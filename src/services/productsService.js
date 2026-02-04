import { createRecord, deleteRecord, updateRecord } from '@/supabase/crud';
import { ProductType } from '@/models/ProductType';
import { AlertService } from '@/services/AlertService';
import { ProductMaterial } from '@/models/ProductMaterial';

const alert = new AlertService();

export function createEmptyProduct() {
    return {
        id: null,
        name: '',
        type: '',
        material: '',
        price: 0,
        available: false,
        size: false,
        img_link: '',
    }
}

export async function createProduct(newProduct) {
    if(!verifyProduct(newProduct)) return;
    const { id, ...productToInsert } = newProduct;
    const normalizedProduct = normalize(productToInsert);
    return await createRecord('products', normalizedProduct);
}

export async function updateProduct(product) {
    if(!product?.id) return;
    if(!verifyProduct(product)) return;
    const normalizedProduct = normalize(product);
    return await updateRecord('products', product.id, normalizedProduct);
}

export async function toggleProductAvailability(product) {
    if(!product?.id) return;
    return await updateRecord('products', product.id, { 
        available: !product.available 
    });
}

export async function deleteProduct(product) {
    if(!product.id) {
        alert.error('O produto não foi encontrado');
        return;
    }
    if(!await alert.deleteConfirm()) return;
    return await deleteRecord('products', product.id);
}

function normalize(product) {
    const typeUpper = ProductType.toUpper(product.type);
    const isCamiseta = typeUpper === ProductType.CAMISETA;
    return {
        ...product,
        name: product.name?.trim(),
        img_link: product.img_link?.trim(),
        type: ProductType.toLower(product.type),
        material: isCamiseta
            ? ProductMaterial.toLower(product.material)
            : null,
        size: isCamiseta ? true : null
    }
}

function verifyProduct(product) {
    if(!product.name) {
        alert.error('O nome do produto é obrigatório');
        return false;
    }
    if(!product.type) {
        alert.error('A categoria do produto é obrigatória');
        return false;
    }
    const type = ProductType.toUpper(product.type);
    if(type === ProductType.CAMISETA && !product.material) {
        alert.error('O material do produto é obrigatório');
        return false;
    }
    if(product.price == null || product.price < 0) {
        alert.error('O preço do produto é obrigatório e deve ser positivo');
        return false;
    }
    if(!product.img_link) {
        alert.error('O link da imagem do produto é obrigatório');
        return false;
    }
    return true;
}