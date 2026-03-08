import { Dog, LogOut, Store, LayoutDashboard, Bell, Calendar1 } from 'lucide-react';

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
        label: 'Eventos',
        key: '/events',
        icon: <Calendar1 size={18} />,
    },
];

export const logoutItem = {
    label: 'Sair',
    key: '/login',
    icon: <LogOut size={18} />,
};
