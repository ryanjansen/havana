import type { Chat, ChatMessage } from "@/types/chat";
import { ChatStatus, Sender } from "@/types/chat";
import { useEffect, useState } from "react";
import { useChatWebSocket } from "./useChatWebSocket";
import { createChat, getChatById, sendMessage } from "@/api/chat";

function saveChatId(id: number) {
    localStorage.setItem("chatId", id.toString());
}

function getSavedChatId(): number | null {
    const id = localStorage.getItem("chatId");
    return id ? parseInt(id, 10) : null;
}

export function useChat(chatId: number | null = null) {
    const [chat, setChat] = useState<Chat>();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isWaitingForAIReply, setIsWaitingForAIReply] = useState(false);

    const { messages: wsMessages, status } = useChatWebSocket(chat?.id);

    useEffect(() => {
        const initializeChat = async () => {
            const savedChatId = getSavedChatId();
            if (!chatId && !savedChatId) {
                const newChat = await createChat();
                setChat(newChat);
                saveChatId(newChat.id);
            } else {
                const existingChat = await getChatById(chatId || savedChatId!);
                setChat(existingChat);
                setMessages(existingChat.messages);
            }
        };
        initializeChat();
    }, [chatId]);

    useEffect(() => {
        if (!wsMessages.length) return;

        if (chat?.status === ChatStatus.AI) {
            const lastMessage = wsMessages[wsMessages.length - 1];
            if (lastMessage?.sender === Sender.User) {
                setIsWaitingForAIReply(true);
            }
        }

        setMessages((prev) => {
            const existingIds = new Set(prev.map((msg) => msg.id));
            const newMessages = wsMessages.filter(
                (msg) => msg.id === undefined || !existingIds.has(msg.id)
            );
            return [...prev, ...newMessages];
        });

        if (chat?.status === ChatStatus.AI) {
            const lastMessage = wsMessages[wsMessages.length - 1];
            if (lastMessage?.sender !== Sender.User) {
                setIsWaitingForAIReply(false);
            }
        }
    }, [wsMessages]);

    useEffect(() => {
        if (chat && chat.status !== status) {
            setChat({ ...chat, status: status });
        }
    }, [status]);

    const handleSendMessage = async (message: string, sender: Sender) => {
        if (!message.trim() || !chat) return;

        await sendMessage(chat.id, message, sender);
    };

    const updateChatStatus = (newStatus: ChatStatus) => {
        if (chat) {
            setChat({ ...chat, status: newStatus });
        }
    };

    return {
        chat,
        updateChatStatus,
        messages,
        isWaitingForAIReply,
        handleSendMessage,
    };
}
