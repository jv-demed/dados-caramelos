import { supabase } from '@/supabase/client';

export async function createRecord<T>(table: string, newObj: T) {
    const { data, error } = await supabase.from(table).insert(newObj).select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}

export async function updateRecord<T>(table: string, id: number, updatedObj: Partial<T>) {
    const { data, error } = await supabase.from(table).update(updatedObj).eq('id', id).select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}

export async function deleteRecord<T>(table: string, id: number) {
    const { data, error } = await supabase.from(table).delete().eq('id', id).select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}
