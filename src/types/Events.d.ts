export interface IEvent {
    img_link: string;
    id: number;
    name: string;
    ended: boolean;
    information: string;
    has_button: boolean;
    button_text?: string | null;
    button_link?: string | null;
    order: number;
}
