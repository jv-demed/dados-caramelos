import { supabase } from '@/supabase/client';
import { IEvent } from '@/types/Events';

export function createEmptyEvent(): IEvent {
    return {
        id: 0,
        name: '',
        information: '',
        img_link: '',
        ended: false,
        has_button: false,
        button_text: null,
        button_link: null,
        order: 0,
    };
}

function normalizeEvent(event: IEvent) {
    return {
        name: event.name,
        information: event.information,
        img_link: event.img_link,
        ended: event.ended,
        has_button: event.has_button,
        button_text: event.button_text?.trim() || null,
        button_link: event.button_link?.trim() || null,
        order: event.order,
    };
}

export async function createEvent(event: IEvent) {
    const { error } = await supabase.from('events').insert([normalizeEvent(event)]);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function updateEvent(event: IEvent) {
    const { error } = await supabase
        .from('events')
        .update(normalizeEvent(event))
        .eq('id', event.id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}

export async function deleteEvent(event: IEvent) {
    const { error } = await supabase.from('events').delete().eq('id', event.id);

    if (error) {
        console.error(error);
        return false;
    }

    return true;
}
