'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase/client';

interface IUser {
    id: string;
    email: string;
}

interface IUserContext {
    user?: IUser;
    refreshUser: () => Promise<IUser | undefined>;
}

const UserContext = createContext<IUserContext | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<IUser | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    async function getUser() {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data?.user) {
            router.push('/login');
            return;
        }

        const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)
            .single();

        if (userError) {
            router.push('/login');
            return;
        }

        return userData as IUser;
    }

    async function refreshUser() {
        const userData = await getUser();
        if (userData) setUser(userData);
        return userData;
    }

    useEffect(() => {
        getUser().then((res) => {
            if (!res) return;
            setUser(res);
            setIsLoading(false);
        });
    }, []);

    return <UserContext.Provider value={{ user, refreshUser }}>{children}</UserContext.Provider>;
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within a UserProvider');
    return context;
};
