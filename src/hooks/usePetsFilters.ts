import { useMemo } from 'react';
import { IPet } from '@/types/Pet';

export type SizeFilter = 'P' | 'M' | 'G' | 'GG';

const sizeGroups: Record<SizeFilter, string[]> = {
    P: ['p', 'p/m'],
    M: ['m', 'm/g', 'p/m'],
    G: ['g', 'm/g'],
    GG: ['gg'],
};

export function usePetsFilters(
    pets: IPet[],
    search: string,
    genderFilter: string | null,
    sizeFilter: SizeFilter | null,
    statusFilter: string | null
) {
    const genderColors = {
        m: 'cyan',
        f: 'magenta',
    };

    const sizeFilters = [
        { label: 'P', value: 'P' },
        { label: 'M', value: 'M' },
        { label: 'G', value: 'G' },
        { label: 'GG', value: 'GG' },
    ];

    const sizeColors: Record<string, string> = {
        p: 'green',
        'p/m': 'lime',
        m: 'blue',
        'm/g': 'geekblue',
        g: 'volcano',
        gg: 'purple',
    };

    const hostedColors = useMemo(() => {
        const palette = ['gold', 'lime', 'geekblue', 'purple', 'cyan', 'magenta'];

        const hosts = Array.from(new Set(pets.map((p) => p.hosted).filter(Boolean)));

        return Object.fromEntries(
            hosts.map((host, index) => [host, palette[index % palette.length]])
        );
    }, [pets]);

    const filteredPets = useMemo(() => {
        return pets.filter((pet) => {
            const matchesSearch = pet.pet_name.toLowerCase().includes(search.toLowerCase());

            const matchesGender = genderFilter ? pet.gender === genderFilter : true;

            const matchesSize = (() => {
                if (!sizeFilter) return true;

                const group = sizeGroups[sizeFilter];

                return group.includes(pet.size?.toLowerCase());
            })();

            const matchesStatus = (() => {
                if (!statusFilter) return true;

                if (statusFilter === 'adopted') {
                    return pet.adopted;
                }

                if (statusFilter === 'available') {
                    return !pet.adopted;
                }

                if (statusFilter === 'hosted') {
                    return !pet.adopted && pet.hosted === 'em LT';
                }

                if (statusFilter === 'shelter') {
                    return !pet.adopted && pet.hosted === 'no Recanto';
                }

                if (statusFilter === 'uni') {
                    return !pet.adopted && pet.hosted === 'no Vale';
                }

                return true;
            })();

            return matchesSearch && matchesGender && matchesSize && matchesStatus;
        });
    }, [pets, search, genderFilter, sizeFilter, statusFilter]);

    return {
        genderColors,
        sizeFilters,
        sizeColors,
        hostedColors,
        filteredPets,
    };
}
