import { ICONS } from '@/assets/icons';

export function SpinLoader({ 
    color = 'text-gray-800', 
    width = '1.2rem' 
}) {
    return (
        <div className='flex items-center justify-center w-full h-auto'>
            <ICONS.spinLoader 
                className={`animate-[spin_0.4s_linear_infinite] ${color}`} 
                style={{ fontSize: width }}
            />
        </div>
    );
}