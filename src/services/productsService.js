import { ProductMaterial } from '@/models/ProductMaterial';
import { ProductType } from '@/models/ProductType';
import { updateRecord } from '@/supabase/crud';

export async function updateProduct(updateProduct) {
    console.log(updateProduct);
    const normalizedProduct = normalize(updateProduct);
    console.log(normalizedProduct);
    return await updateRecord('products', updateProduct.id, normalizedProduct);
}

export async function toggleProductAvailability(product) {
    return await updateRecord('products', product.id, { 
        available: !product.available 
    });
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