import { createRecord, deleteRecord, updateRecord } from '@/supabase/crud';
import { AlertService } from '@/services/AlertService';
import { IPet } from '@/types/Pet';

const alert = new AlertService();

export function createEmptyPet(): IPet {
    return {
        pet_id: 0,
        pet_name: '',
        gender: 'f',
        size: '',
        age: '',
        description: '',
        profile_img: '',
        castrated: false,
        need_sponsorship: false,
        hosted: '',
        adopted: false,
    };
}

export async function createPet(newPet: IPet) {
    if (!verifyPet(newPet)) return;

    const { pet_id, ...petToInsert } = newPet;

    const normalizedPet = normalize(petToInsert);

    return await createRecord('pets_info', normalizedPet);
}

export async function updatePet(pet: IPet) {
    if (!pet?.pet_id) return;
    if (!verifyPet(pet)) return;

    const normalizedPet = normalize(pet);

    return await updateRecord('pets_info', pet.pet_id, normalizedPet, 'pet_id');
}

export async function togglePetAdopted(pet: IPet) {
    if (!pet?.pet_id) return;

    return await updateRecord('pets_info', pet.pet_id, { adopted: !pet.adopted }, 'pet_id');
}

export async function deletePet(pet: IPet) {
    if (!pet.pet_id) {
        alert.error('O pet não foi encontrado');
        return;
    }

    return await deleteRecord('pets_info', pet.pet_id, 'pet_id');
}

function normalize(pet: Partial<IPet>) {
    return {
        ...pet,
        pet_name: pet.pet_name?.trim(),
        description: pet.description?.trim(),
        profile_img: pet.profile_img?.trim(),
        size: pet.size?.toLowerCase(),
        age: pet.age?.trim(),
        hosted: pet.hosted?.trim(),
    };
}

function verifyPet(pet: IPet) {
    if (!pet.pet_name) {
        alert.error('O nome do pet é obrigatório');
        return false;
    }

    if (!pet.gender) {
        alert.error('O gênero do pet é obrigatório');
        return false;
    }

    if (!pet.size) {
        alert.error('O porte do pet é obrigatório');
        return false;
    }

    return true;
}
