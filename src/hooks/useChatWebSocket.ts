import { ChatStatus, Sender, WSEvent, type ChatMessage } from "@/types/chat";
import { useEffect, useRef, useState } from "react";

export function useChatWebSocket(
    chatId: number | null = null,
    sender: Sender = Sender.User
) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [status, setStatus] = useState<ChatStatus>(ChatStatus.AI);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!chatId) return;

        const ws = new WebSocket(
            `ws://localhost:8000/ws/${chatId}${
                sender === Sender.Admin ? "?admin=true" : ""
            }`
        );
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onmessage = (payload) => {
            const { event, body } = JSON.parse(payload.data);

            if (event === WSEvent.NewMessage) {
                const newMessage: ChatMessage = body;
                setMessages((prev) => [...prev, newMessage]);
            } else if (event === WSEvent.Escalated) {
                const newStatus: ChatStatus = body.status;
                setStatus(newStatus);
            }
        };

        ws.onclose = () => {
            console.log("WebSocket disconnected");
        };

        return () => {
            ws.close();
        };
    }, [chatId]);

    return { status, messages };
}
