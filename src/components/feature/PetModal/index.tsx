'use client';
import { useEffect, useState } from 'react';
import { Modal, Button, Input, Checkbox, Select } from 'antd';

import { IPet } from '@/types/Pet';
import { createPet, updatePet } from '@/services/petsService';

interface PetFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void> | void;
    pet?: IPet | null;
}

const genderOptions = [
    { label: 'Macho', value: 'm' },
    { label: 'Fêmea', value: 'f' },
];

const sizeOptions = [
    { label: 'Pequeno', value: 'Pequeno' },
    { label: 'Médio', value: 'Médio' },
    { label: 'Grande', value: 'Grande' },
];

function createEmptyPet(): IPet {
    return {
        adopted: false,
        age: '',
        castrated: false,
        description: '',
        gender: 'm',
        hosted: '',
        need_sponsorship: false,
        pet_id: 0,
        pet_name: '',
        profile_img: '',
        size: '',
    };
}

export function PetForm({ open, onClose, onSuccess, pet }: PetFormProps) {
    const [petModel, setPetModel] = useState<IPet>(createEmptyPet());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPetModel(pet ? { ...pet } : createEmptyPet());
    }, [pet]);

    async function onSave() {
        setLoading(true);

        pet?.pet_id ? await updatePet(petModel) : await createPet(petModel);

        setLoading(false);

        await onSuccess();
        onClose();
    }

    return (
        <Modal
            open={open}
            title={pet?.pet_id ? 'Editar Pet' : 'Novo Pet'}
            onCancel={onClose}
            width={650}
            destroyOnHidden
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button key="save" type="primary" loading={loading} onClick={onSave}>
                    Salvar
                </Button>,
            ]}
        >
            <div className="flex flex-col gap-4 mt-4">
                {/* Nome */}
                <div>
                    <label className="block mb-1 font-medium">Nome</label>
                    <Input
                        value={petModel.pet_name}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                pet_name: e.target.value,
                            })
                        }
                        placeholder="Nome do pet"
                    />
                </div>

                {/* Gênero + Porte */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Gênero</label>

                        <Select
                            className="w-full"
                            value={petModel.gender}
                            onChange={(value) =>
                                setPetModel({
                                    ...petModel,
                                    gender: value,
                                })
                            }
                            options={genderOptions}
                        />
                    </div>

                    <div className="flex-1">
                        <label className="block mb-1 font-medium">Porte</label>

                        <Select
                            className="w-full"
                            value={petModel.size}
                            onChange={(value) =>
                                setPetModel({
                                    ...petModel,
                                    size: value,
                                })
                            }
                            options={sizeOptions}
                            placeholder="Selecione o porte"
                        />
                    </div>
                </div>

                {/* Idade */}
                <div>
                    <label className="block mb-1 font-medium">Idade</label>
                    <Input
                        value={petModel.age}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                age: e.target.value,
                            })
                        }
                        placeholder="Ex: 2 anos"
                    />
                </div>

                {/* Hospedagem */}
                <div>
                    <label className="block mb-1 font-medium">Hospedado em</label>
                    <Input
                        value={petModel.hosted}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                hosted: e.target.value,
                            })
                        }
                        placeholder="Nome do lar temporário"
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6 flex-wrap">
                    <Checkbox
                        checked={petModel.castrated}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                castrated: e.target.checked,
                            })
                        }
                    >
                        Castrado
                    </Checkbox>

                    <Checkbox
                        checked={petModel.need_sponsorship}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                need_sponsorship: e.target.checked,
                            })
                        }
                    >
                        Precisa de apadrinhamento
                    </Checkbox>

                    <Checkbox
                        checked={petModel.adopted}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                adopted: e.target.checked,
                            })
                        }
                    >
                        Adotado
                    </Checkbox>
                </div>

                {/* Imagem */}
                <div>
                    <label className="block mb-1 font-medium">Imagem</label>

                    <Input
                        value={petModel.profile_img}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                profile_img: e.target.value,
                            })
                        }
                        placeholder="https://site.com/pet.jpg"
                    />
                </div>

                {/* Descrição */}
                <div>
                    <label className="block mb-1 font-medium">Descrição</label>

                    <Input.TextArea
                        rows={4}
                        value={petModel.description}
                        onChange={(e) =>
                            setPetModel({
                                ...petModel,
                                description: e.target.value,
                            })
                        }
                        placeholder="Conte um pouco sobre o pet"
                    />
                </div>
            </div>
        </Modal>
    );
}
