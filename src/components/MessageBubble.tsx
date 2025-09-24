import React from 'react';

interface MessageBubbleProps {
    message: string;
    isSender: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isSender }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isSender ? 'flex-end' : 'flex-start',
                marginBottom: '8px',
            }}
        >
            <div
                style={{
                    maxWidth: '70%',
                    padding: '10px 16px',
                    borderRadius: '18px',
                    background: isSender ? '#0078fe' : '#e5e5ea',
                    color: isSender ? '#fff' : '#000',
                    alignSelf: isSender ? 'flex-end' : 'flex-start',
                }}
            >
                {message}
            </div>
        </div>
    );
};

export default MessageBubble;