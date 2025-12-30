export const ProductMaterial = Object.freeze({

    ALGODAO: 'ALGODAO',
    POLIESTER: 'POLIESTER',

    labels: Object.freeze({
        ALGODAO: 'Malha de Algodão',
        POLIESTER: 'Malha de Poliéster',
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