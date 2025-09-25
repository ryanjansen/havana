import type { Chat } from "@/types/chat";
import ChatStatusIcon from "./ChatStatusIcon";
import { IoMdRefresh } from "react-icons/io";

type Properties = {
    chats: Chat[];
    selectedChatId: number;
    setSelectedChatId: (id: number) => void;
    refetch: () => void;
};

export function Sidebar({
    chats,
    selectedChatId,
    setSelectedChatId,
    refetch,
}: Properties) {
    return (
        <aside className="relative w-64 h-[900px] bg-white flex flex-col rounded-2xl shadow-xl overflow-hidden">
            <div className="p-4 font-bold text-xl flex justify-between items-center">
                <span>Chats</span>
                <button
                    onClick={refetch}
                    className="cursor-pointer  py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                >
                    <IoMdRefresh color="blue" />
                </button>
            </div>
            <ul className="flex-1 overflow-y-auto">
                {chats.map((chat) => (
                    <li
                        key={chat.messages[-1]?.timestamp?.toString()}
                        className={`relative cursor-pointer px-4 py-3 border-b hover:bg-gray-100 h-18 ${
                            selectedChatId === chat.id ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setSelectedChatId(chat.id)}
                    >
                        <div className="text-md">
                            {chat.created_at &&
                                (() => {
                                    const date = new Date(chat.created_at);
                                    return date.toLocaleString(undefined, {
                                        day: "2-digit",
                                        month: "short",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    });
                                })()}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                            {chat.messages[chat.messages.length - 1]?.content}
                        </div>
                        <ChatStatusIcon status={chat.status} />
                    </li>
                ))}
            </ul>
        </aside>
    );
}
