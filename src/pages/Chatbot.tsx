import { useState } from "react";
import Chatbox from "@/components/Chatbox";
import { Head } from "@/components/Head";
import MessagePanel from "@/components/MessagePanel";

export function Chatbot() {
    const [messages, setMessages] = useState<
        { text: string; sender: "user" | "other" }[]
    >([]);

    const handleSendMessage = (message: string) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { text: message, sender: "user" },
        ]);
        // Here you can add logic to send the message to a server or process it
    };

    return (
        <>
            <Head title="Chatbot" />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img
                    src="/icons/havana-logo.avif"
                    alt="Havana Logo"
                    className=" h-32 mb-4"
                />
                <MessagePanel messages={messages} />
                <Chatbox handleSendMessage={handleSendMessage} />
            </div>
        </>
    );
}
