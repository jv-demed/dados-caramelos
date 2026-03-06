'use client';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';

type Filter<T> = (query: any) => any;

export function useDataList<T>({
    table,
    select = '*',
    filter,
    order = 'name',
    ascending = true,
}: {
    table: string;
    select?: string;
    filter?: Filter<T>;
    order?: string;
    ascending?: boolean;
}) {
    const [list, setList] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [refreshFlag, setRefreshFlag] = useState(false);

    const refresh = useCallback(() => setRefreshFlag((prev) => !prev), []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                let query = supabase.from(table).select(select);
                if (filter) query = filter(query);
                query = query.order(order, { ascending });

                const { data, error: queryError } = await query;

                if (queryError) throw queryError;

                setList((data ?? []) as T[]);
            } catch (err: any) {
                console.error(err.message);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [table, select, filter, order, ascending, refreshFlag]);

    return { list, setList, loading, error, refresh };
}
