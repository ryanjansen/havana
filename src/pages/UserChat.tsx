import Chatbox from "@/components/Chatbox";
import { Head } from "@/components/Head";
import MessagePanel from "@/components/MessagePanel";
import { useChat } from "@/hooks/useChat";
import { Sender } from "@/types/chat";

export function UserChat() {
    const { chat, messages, isWaitingForAIReply, handleSendMessage } =
        useChat(null);

    const escalateToHuman = () => {
        handleSendMessage("I want to speak to a human agent", Sender.User);
    };

    const bookCall = () => {
        handleSendMessage("I want to book a call.", Sender.User);
    };

    return (
        <>
            <Head title="Chat" />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <img
                    src="/icons/havana-logo.avif"
                    alt="Havana Logo"
                    className=" h-32 mb-4"
                />
                <MessagePanel
                    messages={messages}
                    isWaitingForReply={isWaitingForAIReply}
                />
                <Chatbox
                    handleSendMessage={(message: string) =>
                        handleSendMessage(message, Sender.User)
                    }
                    sender={Sender.User}
                    escalateToHuman={escalateToHuman}
                    bookCall={bookCall}
                    chatStatus={chat?.status}
                />
            </div>
        </>
    );
}
