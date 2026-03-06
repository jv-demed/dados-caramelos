import { IPet } from '@/types/Pet';
import { Switch, Tag, Image, Dropdown, Card } from 'antd';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';

interface IPetsMobileList {
    pets: IPet[];
    genderColors: Record<'m' | 'f', string>;
    handleOpenEditModal: (pet: IPet) => void;
    handleOpenDeleteModal: (pet: IPet) => void;
    togglePetAvailability: (pet: IPet) => void;
}

export function PetsMobileList({
    pets,
    genderColors,
    handleOpenEditModal,
    handleOpenDeleteModal,
    togglePetAvailability,
}: IPetsMobileList) {
    const [expandedPet, setExpandedPet] = useState<number | null>(null);

    function getStatus(pet: IPet) {
        if (pet.adopted) return { label: 'Adotado', color: 'green' };
        if (pet.hosted) return { label: `Hospedado`, color: 'blue' };
        return { label: 'Disponível', color: 'default' };
    }

    return (
        <div className="flex flex-col gap-3 md:hidden">
            {pets.map((pet) => {
                const status = getStatus(pet);
                const isExpanded = expandedPet === pet.pet_id;

                return (
                    <Card
                        key={pet.pet_id}
                        styles={{ body: { padding: 16 } }}
                        onClick={() => setExpandedPet(isExpanded ? null : pet.pet_id)}
                    >
                        <div className="flex gap-4">
                            <Image
                                src={pet.profile_img}
                                alt={pet.pet_name}
                                width={80}
                                height={80}
                                style={{
                                    objectFit: 'cover',
                                    borderRadius: 8,
                                }}
                                preview={false}
                            />

                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold">{pet.pet_name}</h3>

                                        <div className="flex gap-2 mt-1 flex-wrap">
                                            <Tag color={genderColors[pet.gender]}>
                                                {pet.gender === 'm' ? 'Macho' : 'Fêmea'}
                                            </Tag>

                                            <Tag>{pet.size}</Tag>

                                            <Tag color={status.color}>{status.label}</Tag>
                                        </div>
                                    </div>

                                    <Dropdown
                                        trigger={['click']}
                                        menu={{
                                            items: [
                                                {
                                                    key: 'edit',
                                                    label: 'Editar',
                                                    onClick: () => handleOpenEditModal(pet),
                                                },
                                                {
                                                    key: 'delete',
                                                    label: 'Excluir',
                                                    danger: true,
                                                    onClick: () => handleOpenDeleteModal(pet),
                                                },
                                            ],
                                        }}
                                    >
                                        <MoreVertical size={18} style={{ cursor: 'pointer' }} />
                                    </Dropdown>
                                </div>

                                <div className="mt-3">
                                    <Switch
                                        checked={pet.adopted}
                                        checkedChildren="Adotado"
                                        unCheckedChildren="Disponível"
                                        onChange={() => togglePetAvailability(pet)}
                                    />
                                </div>

                                {isExpanded && (
                                    <div className="mt-4 text-sm text-gray-600">
                                        {pet.age && (
                                            <p>
                                                <strong>Idade:</strong> {pet.age}
                                            </p>
                                        )}

                                        {pet.hosted && (
                                            <p>
                                                <strong>Hospedado:</strong> {pet.hosted}
                                            </p>
                                        )}

                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            <Tag color={pet.castrated ? 'green' : 'red'}>
                                                {pet.castrated ? 'Castrado' : 'Não castrado'}
                                            </Tag>

                                            <Tag color={pet.need_sponsorship ? 'gold' : 'default'}>
                                                {pet.need_sponsorship
                                                    ? 'Apadrinhamento'
                                                    : 'Sem padrinho'}
                                            </Tag>
                                        </div>

                                        {pet.description && (
                                            <p className="mt-2" style={{ whiteSpace: 'pre-line' }}>
                                                {pet.description}
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
