'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/supabase/auth';
import { ICONS } from '@/assets/icons';
import { Box } from '@/components/containers/Box';
import { Main } from '@/components/containers/Main';
import { TextInput } from '@/components/inputs/TextInput';
import { ActionBtn } from '@/components/elements/ActionBtn';
import { PasswordInput } from '@/components/inputs/PasswordInput';

export default function LoginPage() {

    const router = useRouter();

    const [auth, setAuth] = useState({
        email: '',
        password: ''
    });

    async function handleSubmit(){
        await login(auth).then(res => {
            if(res.success){
                router.push('/');
            }
        });
    }

    return (
        <Main isWithoutMenu>
            <Box width='400px'>
                <form className='flex flex-col gap-4'>
                    <TextInput title='Login' 
                        value={auth.email}
                        setValue={e => setAuth({ ...auth, email: e })}
                        width='300px'
                    />
                    <PasswordInput title='Senha'
                        value={auth.password}
                        setValue={e => setAuth({ ...auth, password: e })}
                        width='300px'
                    />
                    <ActionBtn text='Entrar'
                        type='submit'
                        icon={ICONS.login}
                        action={handleSubmit}
                    />
                </form>
            </Box>
        </Main>
    );
}