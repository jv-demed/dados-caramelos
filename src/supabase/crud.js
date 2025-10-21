import { supabase } from '@/supabase/client';

export async function updateRecord(table, id, updatedObj) {
    const { data, error } = await supabase
        .from(table)
        .update(updatedObj)
        .eq('id', id)
        .select('*');
    if(error) console.log(error);
    return data;
}