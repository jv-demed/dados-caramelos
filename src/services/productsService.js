import { createRecord, deleteRecord, updateRecord } from '@/supabase/crud';
import { ProductType } from '@/models/ProductType';
import { AlertService } from '@/services/AlertService';
import { ProductMaterial } from '@/models/ProductMaterial';

const alert = new AlertService();

export async function createProduct(newProduct) {
    if(!verifyProduct(newProduct)) return;
    const { id, ...productToInsert } = newProduct;
    const normalizedProduct = normalize(productToInsert);
    return await createRecord('products', normalizedProduct);
}

export async function updateProduct(updateProduct) {
    const normalizedProduct = normalize(updateProduct);
    return await updateRecord('products', updateProduct.id, normalizedProduct);
}

export async function toggleProductAvailability(product) {
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
    return {
        ...product,
        name: product.name?.trim(),
        img_link: product.img_link?.trim(),
        type: ProductType.toLower(product.type),
        material: ProductType.CAMISETA === ProductType.toUpper(product.type)  
                ? ProductMaterial.toLower(product.material)
                : null,
        size: ProductType.CAMISETA === ProductType.toUpper(product.type)
                ? true 
                : null
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
    if(product.type == ProductType.CAMISETA && !product.material) {
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