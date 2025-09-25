import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { escalateChat, getAllChats } from "@/api/chat";
import { Sender, type Chat } from "@/types/chat";
import MessagePanel from "@/components/MessagePanel";
import Chatbox from "@/components/Chatbox";
import { useChat } from "@/hooks/useChat";
import { Sidebar } from "@/components/Admin/Sidebar";
import { Head } from "@/components/Head";

const Admin: React.FC = () => {
    const [selectedChatId, setSelectedChatId] = useState<number>(1);
    const { chat, messages, handleSendMessage, isWaitingForAIReply } =
        useChat(selectedChatId);

    const { data: chats = [], refetch } = useQuery<Chat[]>({
        queryKey: ["chats"],
        queryFn: getAllChats,
    });

    React.useEffect(() => {
        if (
            chats.length > 0 &&
            !chats.find((chat) => chat.id === selectedChatId)
        ) {
            if (chats[0]?.id !== undefined) {
                setSelectedChatId(chats[0].id);
            }
        }
    }, [chats]);

    const sendCallLink = () => {
        handleSendMessage(
            "Please book a call with the admissions office here: [calendly.com/admissions-call](https://calendly.com/admissions-call)",
            Sender.Admin
        );
    };

    const takeoverChat = async () => {
        handleSendMessage(
            "An admin has joined the chat to assist you further.",
            Sender.Admin
        );
        await escalateChat(selectedChatId);
    };

    return (
        <>
            <Head title="Admin Panel" />
            <div className="flex flex-col w-full h-screen bg-zinc-100 text-zinc-800">
                <header className="text-3xl font-bold px-8 pt-8">Admin</header>
                <div className="flex flex-1 gap-8 p-8 justify-center">
                    <Sidebar
                        chats={chats}
                        selectedChatId={selectedChatId}
                        setSelectedChatId={setSelectedChatId}
                        refetch={refetch}
                    />

                    <main className="p-8 flex-1 flex flex-col max-w-2xl bg-white h-[900px] justify-end rounded-2xl shadow-xl overflow-hidden">
                        {chats.length === 0 ? (
                            <div className="text-center text-zinc-400 mb-4">
                                No chats available. Please wait for a user to
                                start a conversation.
                            </div>
                        ) : (
                            <>
                                <MessagePanel
                                    messages={messages || []}
                                    isWaitingForReply={isWaitingForAIReply}
                                />
                                <Chatbox
                                    handleSendMessage={(message: string) =>
                                        handleSendMessage(message, Sender.Admin)
                                    }
                                    sender={Sender.Admin}
                                    takeoverChat={takeoverChat}
                                    sendCallLink={sendCallLink}
                                    chatStatus={chat?.status}
                                />
                            </>
                        )}
                        {chat && (
                            <div className="mt-4 text-sm text-zinc-500 text-right">
                                Status:{" "}
                                <span className="font-semibold">
                                    {chat.status.toUpperCase()}
                                </span>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default Admin;
