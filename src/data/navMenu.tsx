import { Dog, LogOut, Store } from 'lucide-react';

export const navItems = [
    {
        label: 'Pets',
        key: '/',
        icon: <Dog size={18} />,
    },
    {
        label: 'Loja',
        key: '/products',
        icon: <Store size={18} />,
    },
    {
        label: 'Sair',
        key: '/login',
        icon: <LogOut size={18} />,
    },
];
