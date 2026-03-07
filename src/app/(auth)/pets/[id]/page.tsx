'use client';
import { useParams } from 'next/navigation';
import { PetDetailsPage } from '@/screens/petDetails';

export default function PetDetails() {
    const params = useParams();
    const id = Number(params?.id);

    return <PetDetailsPage petId={id} />;
}
