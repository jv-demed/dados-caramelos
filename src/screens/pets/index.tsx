'use client';

import { useState } from 'react';
import { Table, Input, Button, Empty, Select } from 'antd';

import { useDataList } from '@/hooks/useDataList';
import { SizeFilter, usePetsFilters } from '@/hooks/usePetsFilters';
import { usePetsColumns } from '@/hooks/usePetsColumns';

import { IPet } from '@/types/Pet';
import { PetsMobileList } from './PetsMobileList';
import { useRouter } from 'next/navigation';
import { PetForm } from '../../components/feature/PetModal';

const { Search } = Input;

export function PetsPage() {
    const PAGE_SIZE = 10;
    const router = useRouter();

    const pets = useDataList<IPet>({
        table: 'pets_info',
        order: 'pet_name',
    });

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [genderFilter, setGenderFilter] = useState<string | null>(null);
    const [sizeFilter, setSizeFilter] = useState<SizeFilter | null>(null);
    const [statusFilter, setStatusFilter] = useState<string | null>(null);
    const [openModal, setOpenModal] = useState(false);

    const { filteredPets, genderColors, sizeFilters, sizeColors, hostedColors } = usePetsFilters(
        pets.list,
        search,
        genderFilter,
        sizeFilter,
        statusFilter
    );

    const columns = usePetsColumns({
        genderColors,
        sizeColors,
        hostedColors,
        onView: (pet) => {
            router.push(`/pets/${pet.pet_id}`);
        },
    });

    const total = filteredPets.length;
    const start = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
    const end = Math.min(page * PAGE_SIZE, total);

    return (
        <>
            <h1 className="text-xl md:text-2xl font-semibold">Pets</h1>
            <div className="flex flex-col md:grid md:grid-cols-6 gap-3 mb-4">
                <Search
                    placeholder="Buscar pet por nome..."
                    allowClear
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full col-span-5"
                />
                <Button type="primary" onClick={() => setOpenModal(true)}>
                    Adicionar Pet
                </Button>
                <Select
                    placeholder="Sexo"
                    allowClear
                    onChange={(v) => setGenderFilter(v)}
                    options={[
                        { label: 'Macho', value: 'm' },
                        { label: 'Fêmea', value: 'f' },
                    ]}
                    className="w-full col-span-2"
                />
                <Select
                    placeholder="Porte"
                    allowClear
                    onChange={(v) => setSizeFilter(v)}
                    options={sizeFilters}
                    className="w-full col-span-2"
                />
                <Select
                    placeholder="Status"
                    allowClear
                    onChange={(v) => setStatusFilter(v)}
                    options={[
                        { label: 'Disponível', value: 'available' },
                        { label: 'No Vale', value: 'uni' },
                        { label: 'Em lar temporário', value: 'hosted' },
                        { label: 'No abrigo', value: 'shelter' },
                        { label: 'Adotado', value: 'adopted' },
                    ]}
                    className="w-full col-span-2"
                />
                <p className="hidden md:block w-full col-span-6 text-sm text-gray-500">
                    Mostrando{' '}
                    <strong>
                        {start} - {end}
                    </strong>{' '}
                    de {total} pets
                </p>
            </div>
            <Table
                rowKey="pet_id"
                dataSource={filteredPets}
                columns={columns}
                loading={pets.loading}
                pagination={{
                    pageSize: PAGE_SIZE,
                    current: page,
                    onChange: (p) => setPage(p),
                }}
                locale={{
                    emptyText: <Empty description="Nenhum pet encontrado" />,
                }}
                className="hidden md:table"
            />
            <PetsMobileList
                pets={filteredPets}
                genderColors={genderColors}
                sizeColors={sizeColors}
                hostedColors={hostedColors}
            />
            <PetForm
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                    pets.refresh();
                    setOpenModal(false);
                }}
            />
        </>
    );
}
