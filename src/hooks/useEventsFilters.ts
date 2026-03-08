import { IEvent } from '@/types/Events';
import { useMemo } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isBetween);

interface IEventsFilters {
    events: IEvent[];
    search: string;
    dateRange?: [Dayjs | null, Dayjs | null] | null;
}

export function useEventsFilters({ events, search, dateRange }: IEventsFilters) {
    const filteredEvents = useMemo(() => {
        return events.filter((event) => {
            const matchesSearch = event.name.toLowerCase().includes(search.toLowerCase());

            const matchesDate =
                dateRange?.[0] && dateRange?.[1]
                    ? dayjs(event.order.toString(), 'YYYYMMDD').isBetween(
                          dateRange[0],
                          dateRange[1],
                          'day',
                          '[]'
                      )
                    : true;

            return matchesSearch && matchesDate;
        });
    }, [events, search, dateRange]);

    return { filteredEvents };
}
