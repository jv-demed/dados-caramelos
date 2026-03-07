export interface IPetVaccine {
    id: number;
    pet_id: number;
    vaccine: string;
    last_dose: string;
    next_dose: string | null;
}

export interface IPetDeworming {
    id: number;
    pet_id: number;
    vermifuge: string;
    last_date: string;
    next_date: string | null;
}

export interface IPetMedication {
    id: number;
    pet_id: number;
    name: string;
    dosage: string;
    frequency: string;
    start_date: string;
    end_date: string | null;
    active: boolean;
}

export const mockVaccines: IPetVaccine[] = [
    {
        id: 1,
        pet_id: 1,
        vaccine: 'V8',
        last_dose: '2025-03-10',
        next_dose: '2026-03-10',
    },
    {
        id: 2,
        pet_id: 1,
        vaccine: 'Raiva',
        last_dose: '2025-04-02',
        next_dose: '2026-04-02',
    },
    {
        id: 3,
        pet_id: 1,
        vaccine: 'Giárdia',
        last_dose: '2025-05-15',
        next_dose: null,
    },
];

export const mockDeworming: IPetDeworming[] = [
    {
        id: 1,
        pet_id: 1,
        vermifuge: 'Drontal Plus',
        last_date: '2025-05-01',
        next_date: '2025-11-01',
    },
    {
        id: 2,
        pet_id: 1,
        vermifuge: 'Top Dog Vermífugo',
        last_date: '2024-11-10',
        next_date: '2025-05-10',
    },
];

export const mockMedications: IPetMedication[] = [
    {
        id: 1,
        pet_id: 1,
        name: 'Carprofeno',
        dosage: '1cp',
        frequency: '1x por dia',
        start_date: '2025-02-01',
        end_date: '2025-02-10',
        active: false,
    },
    {
        id: 2,
        pet_id: 1,
        name: 'Doxiciclina',
        dosage: '4 gotas',
        frequency: '2x por dia',
        start_date: '2025-03-05',
        end_date: null,
        active: true,
    },
];
