import type { Chat, Sender } from "@/types/chat";
import axios from "axios";

const api = axios.create({
    baseURL: "http://127.0.0.1:8000", // adjust if backend runs elsewhere
});

export interface SendMessageResponse {
    reply?: string;
    error?: string;
}

export const sendMessage = async (
    chatID: number,
    content: string,
    sender: Sender
): Promise<SendMessageResponse> => {
    const response = await api.post(`/chats/${chatID}/messages`, null, {
        params: { content, sender },
    });
    return response.data;
};

export const createChat = async (): Promise<Chat> => {
    const response = await api.post<Chat>("/chats");
    return response.data;
};

export const getChatById = async (chatID: number): Promise<Chat> => {
    const response = await api.get<Chat>(`/chats/${chatID}`);
    return response.data;
};

export const getAllChats = async (): Promise<Chat[]> => {
    const response = await api.get<Chat[]>("/chats");
    return response.data;
};

export const escalateChat = async (chatID: number): Promise<void> => {
    await api.post(`/chats/${chatID}/escalate`);
};
