import { useState } from 'react';
import { IEvent } from '@/types/Events';
import { Tag, Image, Dropdown, Card, Button } from 'antd';
import { MoreVertical } from 'lucide-react';

interface IEventsMobileList {
    events: IEvent[];
    handleOpenEditModal: (event: IEvent) => void;
    handleOpenDeleteModal: (event: IEvent) => void;
}

export function EventsMobileList({
    events,
    handleOpenEditModal,
    handleOpenDeleteModal,
}: IEventsMobileList) {
    const [expandedId, setExpandedId] = useState<string | number | null>(null);

    function toggleExpand(id: string | number) {
        setExpandedId((prev) => (prev === id ? null : id));
    }

    return (
        <div className="flex flex-col gap-3 md:hidden">
            {events.map((item) => {
                const isExpanded = expandedId === item.id;

                return (
                    <Card key={item.id} styles={{ body: { padding: 16 } }}>
                        <div className="flex gap-4">
                            <Image
                                src={item.img_link}
                                alt={item.name}
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
                                        <h3 className="font-semibold">{item.name}</h3>

                                        <Tag color={item.ended ? 'red' : 'green'}>
                                            {item.ended ? 'Encerrado' : 'Ativo'}
                                        </Tag>

                                        {item.has_button && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Botão: {item.button_text}
                                            </p>
                                        )}
                                    </div>
                                    <Dropdown
                                        menu={{
                                            items: [
                                                {
                                                    key: 'edit',
                                                    label: 'Editar',
                                                    onClick: () => handleOpenEditModal(item),
                                                },
                                                {
                                                    key: 'delete',
                                                    label: 'Excluir',
                                                    danger: true,
                                                    onClick: () => handleOpenDeleteModal(item),
                                                },
                                            ],
                                        }}
                                    >
                                        <MoreVertical size={18} />
                                    </Dropdown>
                                </div>
                                {item.information && (
                                    <>
                                        {isExpanded && (
                                            <p className="text-sm text-gray-600 mt-3 whitespace-pre-line">
                                                {item.information}
                                            </p>
                                        )}
                                        <Button
                                            type="link"
                                            size="small"
                                            className="px-0"
                                            onClick={() => toggleExpand(item.id)}
                                        >
                                            {isExpanded ? 'Ver menos' : 'Ver descrição'}
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
}
