import { updateRecord } from '@/supabase/crud';

export async function toggleProductAvailability(product) {
    return await updateRecord('products', product.id, { 
        ...product,
        available: !product.available 
    });
}