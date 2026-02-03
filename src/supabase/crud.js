import { supabase } from '@/supabase/client';

export async function createRecord(table, newObj) {
    const { data, error } = await supabase
        .from(table)
        .insert(newObj)
        .select('*');
    if(error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }
    return data;
}

export async function updateRecord(table, id, updatedObj) {
    const { data, error } = await supabase
        .from(table)
        .update(updatedObj)
        .eq('id', id)
        .select('*');
    if(error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }
    return data;
}

export async function deleteRecord(table, id) {
    const { data, error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)
        .select('*');
    if(error) {
        console.error('Erro no Supabase: ', error.message);
        return null;
    }
    return data;
}