import { Button, Space, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { IEvent } from '@/types/Events';
import { ColumnsType } from 'antd/es/table';
import Image from 'next/image';

interface Props {
    onEdit: (event: IEvent) => void;
    onDelete: (event: IEvent) => void;
}

export function useEventsColumns({ onEdit, onDelete }: Props): ColumnsType<IEvent> {
    return [
        {
            title: 'Imagem',
            dataIndex: 'img_link',
            key: 'img',
            render: (img, record) => (
                <Image
                    src={img}
                    alt={record.name}
                    width={80}
                    height={80}
                    style={{ objectFit: 'cover', borderRadius: 8 }}
                />
            ),
        },
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Data',
            dataIndex: 'order',
            key: 'order',
            sorter: (a: IEvent, b: IEvent) => a.order - b.order,
            render: (value: number) => {
                const str = value.toString();

                const year = str.slice(0, 4);
                const month = str.slice(4, 6);
                const day = str.slice(6, 8);

                return `${day}/${month}/${year}`;
            },
        },
        {
            title: 'Status',
            dataIndex: 'ended',
            key: 'ended',
            filters: [
                { text: 'Encerrado', value: true },
                { text: 'Ativo', value: false },
            ],
            render: (ended: boolean) =>
                ended ? <Tag color="red">Encerrado</Tag> : <Tag color="green">Ativo</Tag>,
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_: unknown, record: IEvent) => (
                <Space className="w-full flex justify-end">
                    <Button icon={<EditOutlined />} onClick={() => onEdit(record)} />
                    <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(record)} />
                </Space>
            ),
        },
    ];
}
