'use server'
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/supabase/server';

export async function login(user){
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword(user);
    if(error){
        console.log(error);
        return { 
            success: false, 
            status: error.status,
            message: error.message 
        };
    }
    return { 
        success: true
    };
}

export async function logout(){
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if(error){
        console.log(error);
    }
    revalidatePath('/login', 'layout');
    redirect('/login');
}