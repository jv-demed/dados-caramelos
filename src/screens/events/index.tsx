'use client';
import { useState } from 'react';
import { useDataList } from '@/hooks/useDataList';
import { Table, Empty, Input, Button, Modal, DatePicker } from 'antd';
import { EventForm } from '@/screens/events/EventModal';
import { useEventsColumns } from '@/hooks/useEventsColumns';
import { Dayjs } from 'dayjs';
import { IEvent } from '@/types/Events';
import { deleteEvent } from '@/services/eventsService';
import { EventsMobileList } from './EventsMobileList';
import { useEventsFilters } from '@/hooks/useEventsFilters';

const { Search } = Input;
const { RangePicker } = DatePicker;

export function EventsPage() {
    const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null] | null>(null);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

    const events = useDataList<IEvent>({
        table: 'events',
        order: 'order',
        ascending: false,
    });

    const { filteredEvents } = useEventsFilters({
        events: events.list,
        search,
        dateRange,
    });

    const columns = useEventsColumns({
        onEdit: handleOpenEditModal,
        onDelete: handleOpenDeleteModal,
    });

    function handleOpenCreateModal() {
        setSelectedEvent(null);
        setIsModalOpen(true);
    }

    function handleOpenEditModal(event: IEvent) {
        setSelectedEvent(event);
        setIsModalOpen(true);
    }

    function handleCloseModal() {
        setIsModalOpen(false);
        setSelectedEvent(null);
    }

    function handleOpenDeleteModal(event: IEvent) {
        Modal.confirm({
            title: 'Confirmar exclusão',
            content: (
                <>
                    Você realmente deseja excluir o evento <strong>{event.name}</strong>? Essa ação
                    não poderá ser desfeita.
                </>
            ),
            okText: 'Excluir',
            okType: 'danger',
            cancelText: 'Cancelar',
            centered: true,
            async onOk() {
                const result = await deleteEvent(event);
                if (!result) return;

                events.refresh();
            },
        });
    }

    return (
        <>
            <EventForm
                open={isModalOpen}
                onClose={handleCloseModal}
                onSuccess={events.refresh}
                event={selectedEvent}
            />
            <div className="flex flex-col gap-4 w-full">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl md:text-2xl font-semibold">Eventos</h1>

                    <Button onClick={handleOpenCreateModal} type="primary">
                        Adicionar Evento
                    </Button>
                </div>
                <div className="flex flex-wrap gap-3 items-center">
                    <Search
                        placeholder="Buscar evento pelo nome"
                        allowClear
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-[280px]"
                    />

                    <RangePicker
                        value={dateRange}
                        onChange={(values) => setDateRange(values)}
                        format="DD/MM/YYYY"
                    />

                    <Button
                        onClick={() => {
                            setSearch('');
                            setDateRange(null);
                        }}
                    >
                        Limpar filtros
                    </Button>
                </div>
            </div>
            <Table
                rowKey="id"
                dataSource={filteredEvents}
                columns={columns}
                loading={events.loading}
                pagination={{ pageSize: 6 }}
                expandable={{
                    expandedRowRender: (record) => (
                        <p className="m-0 whitespace-pre-line">
                            {record.information || 'Sem descrição'}
                        </p>
                    ),
                    rowExpandable: (record) => !!record.information,
                }}
                onChange={(_, filters) => {}}
                locale={{
                    emptyText: <Empty description="Nenhum evento encontrado" />,
                }}
                className="w-full hidden md:table"
            />
            <EventsMobileList
                events={filteredEvents}
                handleOpenEditModal={handleOpenEditModal}
                handleOpenDeleteModal={handleOpenDeleteModal}
            />
        </>
    );
}
