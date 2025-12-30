export const ProductType = Object.freeze({

    ADESIVO: 'ADESIVO',
    BOTTOM: 'BOTTOM',
    CAMISETA: 'CAMISETA',
    CANECA: 'CANECA',
    CHAVEIRO: 'CHAVEIRO',
    CHEIRINHO: 'CHEIRINHO',
    ECOBAG: 'ECOBAG',
    IMA: 'IMA',
    MARCA_PAGINA: 'MARCA_PAGINA',
    PLANNER_SEMANAL: 'PLANNER_SEMANAL',

    labels: Object.freeze({
        ADESIVO: 'Adesivo',
        BOTTOM: 'Bottom',
        CAMISETA: 'Camiseta',
        CANECA: 'Caneca',
        CHAVEIRO: 'Chaveiro',
        CHEIRINHO: 'Cheirinho',
        ECOBAG: 'Ecobag',
        IMA: 'Imã',
        MARCA_PAGINA: 'Marca página',
        PLANNER_SEMANAL: 'Planner semanal',
    }),

    options() {
        return Object.values(this)
            .filter(v => typeof v === 'string')
            .map(value => ({
                value,
                label: this.labels[value],
            }));
    },

    toLower(value) {
        return value?.toLowerCase();
    },

    toUpper(value) {
        return value?.toUpperCase();
    },
    
});