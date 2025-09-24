import { useState } from "react";
import { LuSendHorizontal } from "react-icons/lu";
import IconButton from "./IconButton";

type Properties = {
    handleSendMessage: (message: string) => void;
};

const Chatbox = ({ handleSendMessage }: Properties) => {
    const [message, setMessage] = useState("");

    return (
        <div className="w-full max-w-lg min-w-[400px] flex">
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
                className='ml-2'
            />
        </div>
    );
};

export default Chatbox;
