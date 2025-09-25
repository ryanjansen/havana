export const ChatStatus = {
    AI: "ai",
    Human: "human",
    HandoverPending: "handover_pending",
} as const;

export type ChatStatus = (typeof ChatStatus)[keyof typeof ChatStatus];

export const Sender = {
    User: "user",
    AI: "ai",
    Admin: "admin",
    System: "system",
} as const;

export type Sender = (typeof Sender)[keyof typeof Sender];

export interface ChatMessage {
    id?: number;
    chatId?: number;
    sender: Sender;
    content: string;
    timestamp?: string; // ISO string from backend
}

export interface Chat {
    id: number;
    status: ChatStatus;
    created_at: string; // ISO string
    messages: ChatMessage[];
}

export const WSEvent = {
    NewMessage: "new_message",
    Escalated: "escalated",
    CallBooked: "call_booked",
    AdminUpdate: "admin_update",
} as const;

export type WSEvent = (typeof WSEvent)[keyof typeof WSEvent];
