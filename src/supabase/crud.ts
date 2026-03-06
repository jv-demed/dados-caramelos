import { supabase } from '@/supabase/client';

export async function createRecord<T>(table: string, newObj: T) {
    const { data, error } = await supabase.from(table).insert(newObj).select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}

export async function updateRecord<T>(
    table: string,
    id: number,
    updatedObj: Partial<T>,
    idColumn: string = 'id'
) {
    const { data, error } = await supabase
        .from(table)
        .update(updatedObj)
        .eq(idColumn, id)
        .select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}

export async function deleteRecord<T>(table: string, id: number, idColumn: string = 'id') {
    const { data, error } = await supabase.from(table).delete().eq(idColumn, id).select('*');

    if (error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }

    return data as T[] | null;
}
