import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import IconButton from "./IconButton";
import { GoPerson } from "react-icons/go";
import { IoCallOutline } from "react-icons/io5";
import { ChatStatus, Sender } from "@/types/chat";

type Properties = {
    handleSendMessage: (message: string) => Promise<void>;
    escalateToHuman?: () => void;
    bookCall?: () => void;
    takeoverChat?: () => void;
    sendCallLink?: () => void;
    sender: Sender;
    chatStatus: ChatStatus | undefined;
};

const Chatbox = ({
    handleSendMessage,
    escalateToHuman = () => {},
    bookCall = () => {},
    takeoverChat = () => {},
    sendCallLink = () => {},
    sender,
    chatStatus = ChatStatus.AI,
}: Properties) => {
    const [message, setMessage] = useState("");
    const isAdmin = sender === Sender.Admin;

    return (
        <div className="w-full max-w-xl min-w-[400px] flex m-4">
            <input
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Type here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && message.trim()) {
                        handleSendMessage(message.trim());
                        setMessage("");
                    }
                }}
                disabled={isAdmin && chatStatus !== ChatStatus.Human}
            />
            <IconButton
                icon={<LuSendHorizontal />}
                onClick={() => {
                    if (message.trim()) {
                        handleSendMessage(message.trim());
                        setMessage("");
                    }
                }}
                disabled={!message.trim()}
                className="ml-2"
            />

            <IconButton
                icon={<GoPerson />}
                onClick={isAdmin ? takeoverChat : escalateToHuman}
                className={`${isAdmin && chatStatus === ChatStatus.HandoverPending ? 'bg-red' : ''} ml-2`}
                tooltip={isAdmin ? "Take over the chat" : "Speak to a human"}
                tooltipId="chatbox-human-button"
                disabled={
                    chatStatus === ChatStatus.Human ||
                    (!isAdmin && chatStatus === ChatStatus.HandoverPending)
                }
            />
            <IconButton
                icon={<IoCallOutline />}
                onClick={isAdmin ? sendCallLink : bookCall}
                className="ml-2"
                tooltip={isAdmin ? "Send the call link" : "Book a call"}
                tooltipId="chatbox-call-button"
                disabled={isAdmin && chatStatus !== ChatStatus.Human}
            />
        </div>
    );
};

export default Chatbox;
