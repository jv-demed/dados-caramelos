import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function createClient(){
    const cookieStore = cookies();
    return createServerClient(URL, ANON_KEY, {
        cookies: {
            getAll(){
                return cookieStore.getAll();
            },
            setAll(cookiesToSet){
                try{
                    cookiesToSet.forEach(({ name, value, options }) =>
                        cookieStore.set(name, value, options)
                    );
                } catch{}
            }
        }
    });
}