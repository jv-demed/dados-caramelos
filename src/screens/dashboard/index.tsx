'use client';
import { useDataList } from '@/hooks/useDataList';
import { IPet } from '@/types/Pet';
import { Card } from 'antd';
import { Dog, Heart, Home, MapPin } from 'lucide-react';

export function DashboardPage() {
    const pets = useDataList<IPet>({
        table: 'pets_info',
        order: 'pet_name',
    });

    return (
        <>
            <h1 className="text-xl md:text-2xl font-semibold">Painel de Controle</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>Total de Pets</h2>
                            <p>{pets.list.length}</p>
                            <p className="text-xs">Registrados no Sistema</p>
                        </div>
                        <Heart />
                    </div>
                </Card>
                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>Pets Adotados</h2>
                            <p>{pets.list.filter((pet) => pet.adopted).length}</p>
                            <p className="text-xs">Com suas novas famílias</p>
                        </div>
                        <Heart />
                    </div>
                </Card>
                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>Sob cuidados</h2>
                            <p>{pets.list.filter((pet) => !pet.adopted).length}</p>
                            <p className="text-xs">Aguardando adoção</p>
                        </div>
                        <Dog />
                    </div>
                </Card>

                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>Em Lar Temporário</h2>
                            <p>{pets.list.filter((pet) => pet.hosted === 'em LT').length}</p>
                            <p className="text-xs">Acolhidos por voluntários</p>
                        </div>
                        <Home />
                    </div>
                </Card>
                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>No Recanto</h2>
                            <p>{pets.list.filter((pet) => pet.hosted === 'no Recanto').length}</p>
                            <p className="text-xs">Hospedados no abrigo</p>
                        </div>
                        <MapPin />
                    </div>
                </Card>
                <Card>
                    <div className="w-full flex justify-between">
                        <div>
                            <h2>No Vale</h2>
                            <p>{pets.list.filter((pet) => pet.hosted === 'no Vale').length}</p>
                            <p className="text-xs">Circulando na região</p>
                        </div>
                        <Heart />
                    </div>
                </Card>
            </div>
        </>
    );
}
