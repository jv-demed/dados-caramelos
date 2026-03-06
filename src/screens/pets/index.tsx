'use client';

import { useState } from 'react';
import { useDataList } from '@/hooks/useDataList';

import { Table, Empty, Input, Button, Modal, Tag } from 'antd';

import { usePetsFilters } from '@/hooks/usePetsFilters';
import { usePetsColumns } from '@/hooks/usePetsColumns';

import { IPet } from '@/types/Pet';

import { PetsMobileList } from './PetsMobileList';
import { togglePetAdopted } from '@/services/petsService';
import Image from 'next/image';
import { PetForm } from './PetModal';

const { Search } = Input;

export function PetsPage() {
    const pets = useDataList<IPet>({
        table: 'pets_info',
        order: 'pet_name',
    });

    const [search, setSearch] = useState('');
    const [tableFilters, setTableFilters] = useState({});
    const [selectedPet, setSelectedPet] = useState<IPet | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        booleanFilters,
        filteredPets,
        genderColors,
        genderFilters,
        sizeColors,
        sizeFilters,
        hostedColors,
        hostedFilters,
    } = usePetsFilters(pets.list, search, tableFilters);

    const columns = usePetsColumns({
        booleanFilters,
        genderColors,
        genderFilters,
        sizeColors,
        sizeFilters,
        hostedColors,
        hostedFilters,
        onEdit: handleOpenEditModal,
        onDelete: handleOpenDeleteModal,
        onToggleAdopted: handleTogglePetAdopted,
    });

    function handleOpenAddModal() {
        setIsModalOpen(true);
    }

    function handleOpenEditModal(pet: IPet) {
        setSelectedPet(pet);
        setIsModalOpen(true);
    }

    function handleOpenDeleteModal(pet: IPet) {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: (
                <>
                    Você realmente deseja excluir o pet <strong>{pet.pet_name}</strong>? Essa ação
                    não poderá ser desfeita.
                </>
            ),
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            centered: true,
            async onOk() {
                console.log('delete pet', pet);
                pets.refresh();
            },
        });
    }

    async function handleTogglePetAdopted(pet: IPet) {
        togglePetAdopted(pet);
        pets.refresh();
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedPet(null);
    }

    function renderExpandedRow(pet: IPet) {
        return (
            <div style={{ display: 'flex', gap: 24 }}>
                <div className="relative w-40 h-40">
                    <Image
                        src={pet.profile_img}
                        alt={pet.pet_name}
                        fill
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h3 className="font-semibold">Descrição:</h3>
                    <p style={{ whiteSpace: 'pre-line' }}>{pet.description || 'Sem descrição'}</p>

                    <div style={{ display: 'flex', gap: 24, marginTop: 12 }}>
                        <Tag color={pet.castrated ? 'green' : 'red'}>
                            {pet.castrated ? 'Castrado' : 'Não castrado'}
                        </Tag>
                        <Tag color={pet.need_sponsorship ? 'gold' : 'default'}>
                            {pet.need_sponsorship
                                ? 'Precisa de apadrinhamento'
                                : 'Sem apadrinhamento'}
                        </Tag>
                        {pet.adopted ? (
                            <Tag color="green">Adotado</Tag>
                        ) : pet.hosted ? (
                            <Tag color="blue">Hospedado</Tag>
                        ) : !pet.adopted && !pet.hosted ? (
                            <Tag>Disponível</Tag>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <PetForm
                open={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={pets.refresh}
                pet={selectedPet}
            />
            <h1 className="text-xl md:text-2xl font-semibold">Pets</h1>
            <div className="w-full flex gap-4 md:gap-8">
                <Search
                    placeholder="Buscar pet pelo nome"
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />

                <Button type="primary" onClick={handleOpenAddModal}>
                    Adicionar Pet
                </Button>
            </div>

            <Table
                rowKey="pet_id"
                dataSource={filteredPets}
                columns={columns}
                loading={pets.loading}
                pagination={{ pageSize: 10 }}
                expandable={{
                    expandedRowRender: renderExpandedRow,
                }}
                onChange={(_, filters) => {
                    setTableFilters(filters);
                }}
                locale={{
                    emptyText: <Empty description="Nenhum pet encontrado" />,
                }}
                className="w-full hidden md:table"
            />

            <PetsMobileList
                pets={filteredPets}
                genderColors={genderColors}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
                togglePetAvailability={handleTogglePetAdopted}
            />
        </>
    );
}
