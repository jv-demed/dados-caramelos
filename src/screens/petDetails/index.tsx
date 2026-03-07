'use client';
import { useDataItem } from '@/hooks/useDataItem';
import { IPet } from '@/types/Pet';
import { Card, Tag, Button } from 'antd';
import { ArrowLeft, Edit, Heart, HeartCrack, Home, MapPin, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { togglePetAdopted, updatePet } from '@/services/petsService';
import { PetForm } from '@/components/feature/PetModal';
import { useState } from 'react';

interface IPetDetailsPage {
    petId: number;
}

export function PetDetailsPage({ petId }: IPetDetailsPage) {
    const [openModal, setOpenModal] = useState(false);

    const {
        item: pet,
        loading,
        refresh,
    } = useDataItem<IPet>({
        table: 'pets_info',
        column: 'pet_id',
        id: petId,
    });

    async function handleToggleAdopted() {
        if (!pet) return;
        await togglePetAdopted(pet);
        refresh();
    }

    async function handleSetRecanto() {
        if (!pet) return;
        await updatePet({
            ...pet,
            hosted: 'no Recanto',
        });
        refresh();
    }

    async function handleSetLT() {
        if (!pet) return;
        await updatePet({
            ...pet,
            hosted: 'em LT',
        });
        refresh();
    }

    if (loading) return <div>Carregando...</div>;
    if (!pet) return <div>Pet não encontrado</div>;

    return (
        <>
            <div className="flex justify-between">
                <Link href="/pets" className="flex gap-2 items-center">
                    <ArrowLeft size={18} />
                    <p className="hidden md:block">Voltar para lista de pets</p>
                </Link>
                <Button type="primary" icon={<Edit size={16} />} onClick={() => setOpenModal(true)}>
                    Editar
                </Button>
            </div>
            <Card>
                <div className="flex flex-col md:grid md:grid-cols-[auto_1fr] gap-4">
                    <div className="relative w-full md:w-64 h-64">
                        <Image
                            src={pet.profile_img}
                            alt={pet.pet_name}
                            fill
                            className="rounded-md object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-semibold">{pet.pet_name}</h2>
                        <div className="flex gap-2">
                            {pet.adopted ? (
                                <Tag color="green">Adotado</Tag>
                            ) : pet.hosted ? (
                                <Tag>{pet.hosted}</Tag>
                            ) : (
                                <Tag>Disponível</Tag>
                            )}
                            <Tag>{pet.gender === 'm' ? 'Macho' : 'Fêmea'}</Tag>
                            <Tag>{pet.size.toUpperCase()}</Tag>
                            <Tag>{pet.age}</Tag>
                        </div>
                        <p className="my-3 whitespace-pre-line">{pet.description}</p>
                        <div className="flex gap-3">
                            <Button
                                type="primary"
                                icon={pet.adopted ? <HeartCrack size={16} /> : <Heart size={16} />}
                                onClick={handleToggleAdopted}
                            >
                                {pet.adopted ? 'Desmarcar adoção' : 'Marcar como adotado'}
                            </Button>
                            <Button icon={<MapPin size={16} />} onClick={handleSetRecanto}>
                                Colocar no recanto
                            </Button>
                            <Button icon={<Home size={16} />} onClick={handleSetLT}>
                                Colocar em LT
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
            {/*<Tabs
                items={[
                    {
                        key: 'saude',
                        label: 'Saúde',
                        children: (
                            <div className="flex flex-col gap-4">
                                <Card title="Vacinas">
                                    <div className="flex flex-col gap-3">
                                        {mockVaccines.map((v) => (
                                            <div
                                                key={v.id}
                                                className="grid grid-cols-[auto_1fr_auto] gap-3 items-center bg-gray-50 p-3 rounded-md"
                                            >
                                                <CheckCircle color="green" size={24} />
                                                <div>
                                                    <p className="font-medium">{v.vaccine}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Última dose: {v.last_dose}
                                                    </p>
                                                </div>

                                                <p className="text-blue-600 text-sm font-semibold">
                                                    Próxima: {v.next_dose}
                                                </p>
                                            </div>
                                        ))}
                                        <Button
                                            icon={<Plus size={16} />}
                                            type="primary"
                                            className="w-fit"
                                        >
                                            Adicionar Vacina
                                        </Button>
                                    </div>
                                </Card>
                                <Card title="Vermifugação">
                                    <div className="flex flex-col gap-3">
                                        <div className="grid grid-cols-2">
                                            <div>
                                                <p className="font-medium">
                                                    {mockDeworming[0].vermifuge}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Última Vermifugação
                                                </p>
                                                <p className="font-medium">
                                                    {mockDeworming[0].last_date}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">
                                                    Próxima Vermifugação
                                                </p>
                                                <p className="text-blue-600 font-medium">
                                                    {mockDeworming[0].next_date}
                                                </p>
                                            </div>
                                        </div>

                                        <Button
                                            icon={<Plus size={16} />}
                                            type="primary"
                                            className="w-fit"
                                        >
                                            Adicionar Vermifugação
                                        </Button>
                                    </div>
                                </Card>
                                <Card title="Medicamentos">
                                    <div className="flex flex-col gap-3">
                                        {mockMedications.map((m) => (
                                            <div
                                                key={m.id}
                                                className="flex justify-between bg-blue-50 border border-blue-200 p-4 rounded-md"
                                            >
                                                <div>
                                                    <p className="font-medium">{m.name}</p>

                                                    <p className="text-sm text-gray-600">
                                                        {m.dosage} - {m.frequency}
                                                    </p>

                                                    <p className="text-sm text-gray-500 mt-2">
                                                        Início: {m.start_date}
                                                    </p>

                                                    <p className="text-sm text-gray-500">
                                                        Fim: {m.end_date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}

                                        <Button danger icon={<Plus size={16} />} className="w-fit">
                                            Adicionar Medicamento
                                        </Button>
                                    </div>
                                </Card>
                                <Card title="Alimentação">
                                    <div className="grid grid-cols-2 gap-y-4">
                                        <div>
                                            <p className="text-sm text-gray-500">Marca da Ração</p>
                                            <p className="font-medium">Pedigree Adulto</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Quantidade</p>
                                            <p className="font-medium">300g - 2x ao dia</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Última Compra</p>
                                            <p className="font-medium">19/02/2025</p>
                                        </div>

                                        <div>
                                            <p className="text-sm text-gray-500">Próxima Compra</p>
                                            <p className="text-red-500 font-medium">19/03/2025</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card title="Notas de Saúde">
                                    <p className="text-gray-700">
                                        Em tratamento para problemas de pele e câncer na patinha.
                                        Acompanhamento veterinário quinzenal.
                                    </p>
                                </Card>
                            </div>
                        ),
                    },
                ]}
            />*/}
            <PetForm
                pet={pet}
                open={openModal}
                onClose={() => setOpenModal(false)}
                onSuccess={() => {
                    refresh();
                    setOpenModal(false);
                }}
            />
        </>
    );
}
