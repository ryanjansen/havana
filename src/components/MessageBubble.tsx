import React from "react";
import ReactMarkdown from "react-markdown";
import { CircleLoader } from "react-spinners";

interface MessageBubbleProps {
    message: string;
    isUser: boolean;
    isLoading?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
    message,
    isUser,
    isLoading = false,
}) => {
    return (
        <div
            className={`flex ${
                isUser ? "justify-end" : "justify-start"
            } items-start`}
        >
            {!isUser && (
                <span className="mr-2 mt-2 flex items-center">
                    <img
                        src="/icons/palm-tree-icon.svg"
                        alt="Palm Tree Icon"
                        className="h-6 w-6"
                    />
                </span>
            )}
            <div
                className={`rounded-lg p-3 text-white text-sm max-w-sm break-words ${
                    isUser ? "bg-blue-700" : "bg-green-700"
                }`}
            >
                {isLoading ? (
                    <CircleLoader size={20} color="#ffffff" />
                ) : (
                    <ReactMarkdown>{message}</ReactMarkdown>
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
