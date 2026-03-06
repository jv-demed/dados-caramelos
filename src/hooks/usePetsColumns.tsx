import { FilterOptionProps } from '@/types/FilterOption';
import { IPet } from '@/types/Pet';
import { Image, Tag, Switch, Dropdown } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { MoreVertical } from 'lucide-react';

type UsePetsColumnsProps = {
    genderFilters: FilterOptionProps<'m' | 'f'>[];
    sizeFilters: FilterOptionProps<string>[];
    booleanFilters: FilterOptionProps<boolean>[];

    genderColors: Record<'m' | 'f', string>;
    sizeColors: Record<string, string>;

    hostedFilters: FilterOptionProps<string>[];
    hostedColors: Record<string, string>;

    onEdit: (pet: IPet) => void;
    onDelete: (pet: IPet) => void;
    onToggleAdopted: (pet: IPet) => void;
};

export function usePetsColumns({
    genderFilters,
    sizeFilters,
    booleanFilters,
    genderColors,
    sizeColors,
    hostedFilters,
    hostedColors,
    onEdit,
    onDelete,
    onToggleAdopted,
}: UsePetsColumnsProps): ColumnsType<IPet> {
    return [
        {
            title: 'Imagem',
            dataIndex: 'profile_img',
            key: 'img',
            width: 80,
            render: (img, record) => (
                <Image
                    src={img}
                    alt={record.pet_name}
                    width={60}
                    height={60}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                    preview={false}
                />
            ),
        },
        {
            title: 'Nome',
            dataIndex: 'pet_name',
            key: 'pet_name',
        },
        {
            title: 'Gênero',
            dataIndex: 'gender',
            key: 'gender',
            filters: genderFilters,
            onFilter: (value, record) => record.gender === value,
            render: (gender: 'm' | 'f') => (
                <Tag color={genderColors[gender]}>{gender === 'm' ? 'Macho' : 'Fêmea'}</Tag>
            ),
        },
        {
            title: 'Porte',
            dataIndex: 'size',
            key: 'size',
            filters: sizeFilters,
            onFilter: (value, record) => record.size === value,
            render: (size: string) => (
                <Tag color={sizeColors[size] || 'default'}>{size.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Idade',
            dataIndex: 'age',
            key: 'age',
            render: (age: string) => age || '-',
        },
        {
            title: 'Adotado',
            dataIndex: 'adopted',
            key: 'adopted',
            filters: booleanFilters,
            onFilter: (value, record) => record.adopted === value,
            render: (adopted: boolean, record) => (
                <Switch
                    checked={adopted}
                    checkedChildren="Sim"
                    unCheckedChildren="Não"
                    onChange={() => onToggleAdopted(record)}
                />
            ),
        },
        {
            title: 'Hospedado',
            dataIndex: 'hosted',
            key: 'hosted',
            filters: hostedFilters,
            onFilter: (value, record) => record.hosted === value,
            render: (hosted: string | null) =>
                hosted ? <Tag color={hostedColors[hosted] || 'blue'}>{hosted}</Tag> : <Tag>-</Tag>,
        },
        {
            title: '',
            key: 'actions',
            width: 50,
            render: (_, record) => (
                <Dropdown
                    trigger={['click']}
                    menu={{
                        items: [
                            {
                                key: 'edit',
                                label: 'Editar',
                                onClick: () => onEdit(record),
                            },
                            {
                                key: 'delete',
                                label: 'Excluir',
                                danger: true,
                                onClick: () => onDelete(record),
                            },
                        ],
                    }}
                >
                    <MoreVertical size={18} style={{ cursor: 'pointer' }} />
                </Dropdown>
            ),
        },
    ];
}
