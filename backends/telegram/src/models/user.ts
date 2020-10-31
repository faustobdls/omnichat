export interface User {
    name: string;
    cpf: string;
    provider: { telegram: number };
    messages: Array<Message>;
}

export interface Message {
    type: string;
    provider: string;
    create: number;
    message_content: string;
    message_obj: any;
}