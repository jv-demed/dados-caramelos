'use client'
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/supabase/client';

export function useDataList({
    table,
    select = '*',
    filter, 
    order = 'name', 
    ascending = true,
}){

    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(() => {
        setFlag(prev => !prev);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try{
                let query = supabase.from(table).select(select);
                if(filter){
                    query = filter(query);
                }
                query = query.order(order, { ascending });
                const { data, error } = await query;
                if(error) throw error;
                setList(data);
            }catch(err){
                console.log(err.message);
            }finally{
                setLoading(false);
            }
        };
        fetchData();
    }, [flag]);

    return { list, setList, loading, refresh };
}