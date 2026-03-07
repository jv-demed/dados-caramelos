'use client';
import { supabase } from '@/supabase/client';
import { useCallback, useEffect, useState } from 'react';

export function useDataItem<T>({
    table,
    id,
    column = 'id',
    select = '*',
}: {
    table: string;
    id: number;
    column?: string;
    select?: string;
}) {
    const [item, setItem] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchItem = useCallback(async () => {
        setLoading(true);

        const { data, error } = await supabase.from(table).select(select).eq(column, id).single();

        if (!error && data) {
            setItem(data as T);
        }

        setLoading(false);
    }, [table, id, column, select]);

    useEffect(() => {
        if (id) fetchItem();
    }, [fetchItem]);

    return { item, loading, refresh: fetchItem };
}
