import React, { useEffect, useRef } from "react";

interface Message {
    text: string;
    sender: "user" | "other";
}

interface Properties {
    messages: Message[];
}

const MessagePanel = ({ messages }: Properties) => {
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="flex flex-col w-full max-w-xl h-200 overflow-y-auto p-4">
            {messages.length === 0 && (
                <div className="flex flex-col justify-center items-center h-full text-gray-500 text-center my-8">
                    Welcome! Start the conversation by sending a message.
                </div>
            )}
            {messages.map((msg, idx) => (
                <div
                    key={idx}
                    className={`flex mt-4 ${
                        msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                    <div
                        className={`rounded-lg p-3 text-white max-w-xs break-words ${
                            msg.sender === "user"
                                ? "bg-blue-700"
                                : "bg-green-700 text-right"
                        }`}
                    >
                        {msg.text}
                    </div>
                </div>
            ))}
            <div ref={chatEndRef} />
        </div>
    );
};

export default MessagePanel;
