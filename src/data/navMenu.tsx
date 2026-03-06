import { LogOut, Store } from 'lucide-react';

export const navItems = [
    {
        label: 'Loja',
        key: '/',
        icon: <Store size={18} />,
    },
    {
        label: 'Sair',
        key: '/login',
        icon: <LogOut size={18} />,
    },
];
