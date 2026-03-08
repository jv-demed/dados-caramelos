'use client';

import { useEffect, useState } from 'react';
import { Modal, Button, Input, Checkbox } from 'antd';

import { createEvent, updateEvent, createEmptyEvent } from '@/services/eventsService';
import { IEvent } from '@/types/Events';

const { TextArea } = Input;

interface EventFormProps {
    open: boolean;
    onClose: () => void;
    onSuccess: () => Promise<void> | void;
    event?: IEvent | null;
}

export function EventForm({ open, onClose, onSuccess, event }: EventFormProps) {
    const [eventModel, setEventModel] = useState<IEvent>(createEmptyEvent());
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEventModel(event ? { ...event } : createEmptyEvent());
    }, [event]);

    async function onSave() {
        setLoading(true);

        const result = event?.id ? await updateEvent(eventModel) : await createEvent(eventModel);

        setLoading(false);

        if (!result) return;

        await onSuccess();
        onClose();
    }

    return (
        <Modal
            open={open}
            title={event?.id ? 'Editar Evento' : 'Novo Evento'}
            onCancel={onClose}
            width={600}
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
                <div>
                    <label className="block mb-1 font-medium">Nome</label>
                    <Input
                        value={eventModel.name}
                        onChange={(e) => setEventModel({ ...eventModel, name: e.target.value })}
                        placeholder="Nome do evento"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Informações</label>
                    <TextArea
                        rows={6}
                        value={eventModel.information}
                        onChange={(e) =>
                            setEventModel({
                                ...eventModel,
                                information: e.target.value,
                            })
                        }
                        placeholder="Descrição do evento"
                    />
                </div>

                <div>
                    <label className="block mb-1 font-medium">Link da Imagem</label>
                    <Input
                        value={eventModel.img_link}
                        onChange={(e) =>
                            setEventModel({
                                ...eventModel,
                                img_link: e.target.value,
                            })
                        }
                        placeholder="https://site.com/imagem.jpg"
                    />
                </div>

                <div className="flex gap-6">
                    <Checkbox
                        checked={eventModel.ended}
                        onChange={(e) =>
                            setEventModel({
                                ...eventModel,
                                ended: e.target.checked,
                            })
                        }
                    >
                        Evento encerrado
                    </Checkbox>

                    <Checkbox
                        checked={eventModel.has_button}
                        onChange={(e) =>
                            setEventModel({
                                ...eventModel,
                                has_button: e.target.checked,
                            })
                        }
                    >
                        Possui botão
                    </Checkbox>
                </div>

                {eventModel.has_button && (
                    <>
                        <div>
                            <label className="block mb-1 font-medium">Texto do botão</label>
                            <Input
                                value={eventModel.button_text || ''}
                                onChange={(e) =>
                                    setEventModel({
                                        ...eventModel,
                                        button_text: e.target.value,
                                    })
                                }
                                placeholder="Ex: Comprar ingresso"
                            />
                        </div>

                        <div>
                            <label className="block mb-1 font-medium">Link do botão</label>
                            <Input
                                value={eventModel.button_link || ''}
                                onChange={(e) =>
                                    setEventModel({
                                        ...eventModel,
                                        button_link: e.target.value,
                                    })
                                }
                                placeholder="https://..."
                            />
                        </div>
                    </>
                )}

                <div>
                    <label className="block mb-1 font-medium">Ordem</label>
                    <Input
                        type="number"
                        value={eventModel.order}
                        onChange={(e) =>
                            setEventModel({
                                ...eventModel,
                                order: Number(e.target.value),
                            })
                        }
                    />
                </div>
            </div>
        </Modal>
    );
}
