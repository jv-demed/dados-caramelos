import { Dog, LogOut, Store, LayoutDashboard, Bell } from 'lucide-react';

export const navItems = [
    {
        label: 'Dashboard',
        key: '/',
        icon: <LayoutDashboard size={16} />,
    },
    {
        label: 'Pets',
        key: '/pets',
        icon: <Dog size={16} />,
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
