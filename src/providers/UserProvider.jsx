'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/client';
import { Main } from '@/components/containers/Main';
import { SpinLoader } from '@/components/elements/SpinLoader';

const UserContext = createContext(null);

export function UserProvider({ children }){

    const router = useRouter();

    const [user, setUser] = useState();

    const [isLoading, setIsLoading] = useState(true);

    async function getUser(){
        const { data, error } = await supabase.auth.getUser();
        if(error || !data?.user){
            router.push('/login');
            return;
        }
        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();
        if(userError){
            router.push('/login');
            return;
        }return userData;
    }

    async function refreshUser() {
        const userData = await getUser();
        if(userData) setUser(userData);
        return userData;
    }
    
    useEffect(() => {
        getUser().then(async res => {
            if(!res) return;
            setUser(res);
            setIsLoading(false);
        });
    }, []);
    
    if(isLoading){
        return (
            <Main $justifyContent='center'>
                <SpinLoader />
            </Main>
        );
    }
    return (
        <UserContext.Provider value={{ user, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);