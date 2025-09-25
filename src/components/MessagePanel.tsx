import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Sender, type ChatMessage } from "@/types/chat";

interface Properties {
    messages: ChatMessage[];
    isWaitingForReply?: boolean;
}

const MessagePanel = ({ messages, isWaitingForReply }: Properties) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl h-200 overflow-y-auto p-4">
            {messages?.length === 0 && (
                <div className="flex flex-col justify-center items-center h-full text-gray-500 text-center my-8">
                    Welcome! Start the conversation by sending a message.
                </div>
            )}
            {messages.map((msg, idx) => (
                <MessageBubble
                    key={idx}
                    message={msg.content}
                    isUser={msg.sender === Sender.User}
                />
            ))}
            {isWaitingForReply && (
                <MessageBubble isLoading={true} message="" isUser={false} />
            )}
            <div ref={chatEndRef} />
        </div>
    );
};

export default MessagePanel;
