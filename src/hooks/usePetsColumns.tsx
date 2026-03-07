import { Image, Tag, Button, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MessageCircle, Eye } from 'lucide-react';
import { IPet } from '@/types/Pet';

type Props = {
    genderColors: Record<'m' | 'f', string>;
    sizeColors: Record<string, string>;
    hostedColors: Record<string, string>;
    onView: (pet: IPet) => void;
};

export function usePetsColumns({
    genderColors,
    sizeColors,
    hostedColors,
    onView,
}: Props): ColumnsType<IPet> {
    const statusRank = (pet: IPet) => {
        if (pet.adopted) return 3;
        if (pet.hosted) return 2;
        return 1;
    };

    return [
        {
            title: 'Pet',
            key: 'pet',
            sorter: (a, b) => a.pet_name.localeCompare(b.pet_name),
            sortDirections: ['ascend', 'descend'],
            render: (_, pet) => (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Image
                        src={pet.profile_img}
                        alt={pet.pet_name}
                        width={64}
                        height={64}
                        style={{ borderRadius: 8, objectFit: 'cover' }}
                        preview={false}
                    />

                    <strong>{pet.pet_name}</strong>
                </div>
            ),
        },
        {
            title: 'Info',
            key: 'info',
            render: (_, pet) => (
                <Space>
                    <Tag color={genderColors[pet.gender]}>
                        {pet.gender === 'm' ? 'Macho' : 'Fêmea'}
                    </Tag>
                    <Tag color={sizeColors[pet.size]}>{pet.size?.toUpperCase()}</Tag>
                    <Tag>{pet.age || '-'}</Tag>
                </Space>
            ),
        },
        {
            title: 'Status',
            key: 'status',
            sorter: (a, b) => statusRank(a) - statusRank(b),
            sortDirections: ['ascend', 'descend'],
            render: (_, pet) => {
                if (pet.adopted) return <Tag color="green">Adotado</Tag>;

                if (pet.hosted) return <Tag color={hostedColors[pet.hosted]}>{pet.hosted}</Tag>;

                return <Tag color="default">Disponível</Tag>;
            },
        },
        {
            title: 'Responsável',
            key: 'responsible',
            render: (_, pet) => {
                if (!pet.adopted && pet.hosted !== 'em LT') return '-';

                const name = 'Maria';
                const phone = '(44) 99999 ' + String(pet.pet_id).padStart(4, '0');

                return (
                    <div>
                        <strong>{name}</strong>
                        <br />
                        {phone}
                    </div>
                );
            },
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, pet) => {
                if (!pet.adopted && pet.hosted !== 'em LT') {
                    return (
                        <Space className="w-full flex justify-end">
                            <Button icon={<Eye size={16} />} onClick={() => onView(pet)} />
                        </Space>
                    );
                }

                const phone = '4499999' + String(pet.pet_id).padStart(4, '0');

                return (
                    <Space className="w-full flex justify-end">
                        <Button
                            icon={<MessageCircle size={16} />}
                            onClick={() => window.open(`https://wa.me/55${phone}`)}
                        />
                        <Button icon={<Eye size={16} />} onClick={() => onView(pet)} />
                    </Space>
                );
            },
        },
    ];
}
