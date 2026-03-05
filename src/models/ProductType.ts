export const ProductType = {
    ADESIVO: {
        value: 'ADESIVO',
        label: 'Adesivo',
    },
    BOTTOM: {
        value: 'BOTTOM',
        label: 'Bottom',
    },
    CAMISETA: {
        value: 'CAMISETA',
        label: 'Camiseta',
    },
    CANECA: {
        value: 'CANECA',
        label: 'Caneca',
    },
    CHAVEIRO: {
        value: 'CHAVEIRO',
        label: 'Chaveiro',
    },
    CHEIRINHO: {
        value: 'CHEIRINHO',
        label: 'Cheirinho',
    },
    ECOBAG: {
        value: 'ECOBAG',
        label: 'Ecobag',
    },
    IMA: {
        value: 'IMA',
        label: 'Imã',
    },
    MARCA_PAGINA: {
        value: 'MARCA_PAGINA',
        label: 'Marca página',
    },
    PLANNER_SEMANAL: {
        value: 'PLANNER_SEMANAL',
        label: 'Planner semanal',
    },
} as const;

export type ProductType = (typeof ProductType)[keyof typeof ProductType]['value'];

export const productTypeOptions = Object.values(ProductType);
