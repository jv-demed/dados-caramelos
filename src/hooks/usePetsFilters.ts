import { useMemo } from 'react';
import { FilterValue } from 'antd/es/table/interface';
import { IPet } from '@/types/Pet';

const sizeTagPalette = ['red', 'volcano', 'orange', 'gold', 'green', 'blue', 'purple'];
const hostedTagPalette = ['blue', 'geekblue', 'purple', 'magenta', 'gold', 'lime', 'green', 'cyan'];

type PetGender = 'm' | 'f';

export function usePetsFilters(
    pets: IPet[],
    search: string,
    tableFilters: Record<string, FilterValue>
) {
    const genderColors = {
        m: 'cyan',
        f: 'magenta',
    };

    const genderFilters: { text: string; value: PetGender }[] = [
        { text: 'Macho', value: 'm' },
        { text: 'Fêmea', value: 'f' },
    ];

    const sizeFilters = useMemo(() => {
        return Array.from(new Set(pets.map((p) => p.size)))
            .sort()
            .map((size) => ({
                text: size,
                value: size,
            }));
    }, [pets]);

    const sizeColors = useMemo(() => {
        return Object.fromEntries(
            sizeFilters.map((s, index) => [s.value, sizeTagPalette[index % sizeTagPalette.length]])
        );
    }, [sizeFilters]);

    const booleanFilters = [
        { text: 'Sim', value: true },
        { text: 'Não', value: false },
    ];

    const hostedFilters = useMemo(() => {
        const hosts = Array.from(new Set(pets.map((p) => p.hosted).filter(Boolean)));

        return hosts.map((host) => ({
            text: host,
            value: host,
        }));
    }, [pets]);

    const hostedColors = useMemo(() => {
        const hosts = hostedFilters.map((h) => h.value);

        return Object.fromEntries(
            hosts.map((host, index) => [host, hostedTagPalette[index % hostedTagPalette.length]])
        );
    }, [hostedFilters]);

    const filteredPets = useMemo(() => {
        return pets.filter((pet) => {
            const matchesSearch = pet.pet_name.toLowerCase().includes(search.toLowerCase());

            const matchesGender = tableFilters.gender
                ? tableFilters.gender.includes(pet.gender)
                : true;

            const matchesSize = tableFilters.size ? tableFilters.size.includes(pet.size) : true;

            const matchesCastrated = tableFilters.castrated
                ? tableFilters.castrated.includes(pet.castrated)
                : true;

            const matchesSponsorship = tableFilters.need_sponsorship
                ? tableFilters.need_sponsorship.includes(pet.need_sponsorship)
                : true;

            const matchesAdopted = tableFilters.adopted
                ? tableFilters.adopted.includes(pet.adopted)
                : true;

            return (
                matchesSearch &&
                matchesGender &&
                matchesSize &&
                matchesCastrated &&
                matchesSponsorship &&
                matchesAdopted
            );
        });
    }, [pets, search, tableFilters]);

    return {
        genderFilters,
        sizeFilters,
        booleanFilters,
        sizeColors,
        genderColors,
        filteredPets,
        hostedColors,
        hostedFilters,
    };
}
