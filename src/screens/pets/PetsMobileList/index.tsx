'use client';

import { Card, Tag, Button, Space } from 'antd';
import { MessageCircle, Eye } from 'lucide-react';
import { IPet } from '@/types/Pet';
import Image from 'next/image';

type IPetsMobileList = {
    pets: IPet[];
    genderColors: Record<'m' | 'f', string>;
    sizeColors: Record<string, string>;
    hostedColors: Record<string, string>;
};

export function PetsMobileList({ pets, genderColors, sizeColors, hostedColors }: IPetsMobileList) {
    return (
        <div className="flex flex-col gap-4 md:hidden">
            {pets.map((pet) => {
                const hasResponsible = pet.adopted || pet.hosted;

                const role = pet.adopted ? 'Adotante' : 'Lar temporário';

                const name = hasResponsible ? 'Nome da pessoa' : null;

                const phone = hasResponsible
                    ? '4499999' + String(pet.pet_id).padStart(4, '0')
                    : null;

                return (
                    <Card key={pet.pet_id}>
                        <div className="flex gap-4">
                            <div className="relative w-24 h-24">
                                <Image
                                    src={pet.profile_img}
                                    alt={pet.pet_name}
                                    fill
                                    className="rounded-md object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-semibold">{pet.pet_name}</h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {pet.adopted ? (
                                        <Tag color="green">Adotado</Tag>
                                    ) : pet.hosted ? (
                                        <Tag color={hostedColors[pet.hosted]}>{pet.hosted}</Tag>
                                    ) : (
                                        <Tag>Disponível</Tag>
                                    )}
                                    <Tag color={genderColors[pet.gender]}>
                                        {pet.gender === 'm' ? 'Macho' : 'Fêmea'}
                                    </Tag>
                                    <Tag color={sizeColors[pet.size]}>{pet.size.toUpperCase()}</Tag>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                            {pet.hosted === 'em LT' && (
                                <div className="mt-3 text-sm">
                                    <div className="text-gray-500">{role}</div>
                                    <strong>{name}</strong>
                                </div>
                            )}
                            <div className="mt-3 flex gap-3 w-full">
                                {pet.hosted === 'em LT' && (
                                    <Button
                                        icon={<MessageCircle size={16} />}
                                        onClick={() => window.open(`https://wa.me/55${phone}`)}
                                        className="w-full"
                                    >
                                        WhatsApp
                                    </Button>
                                )}
                                <Button icon={<Eye size={16} />} className="w-full">
                                    Ver detalhes
                                </Button>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
