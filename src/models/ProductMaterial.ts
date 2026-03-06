export const ProductMaterial = {
    ALGODAO: {
        value: 'ALGODAO',
        label: 'Malha de Algodão',
    },
    POLIESTER: {
        value: 'POLIESTER',
        label: 'Malha de Poliéster',
    },
} as const;

export type ProductMaterial = (typeof ProductMaterial)[keyof typeof ProductMaterial]['value'];

export const productMaterialOptions = Object.values(ProductMaterial);
