import React, { useState } from 'react';
import { useTracker, useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import {Messages} from "/imports/api/messages";

const Chat = ({roomId}) => {
    const [message, setMessage] = useState('');

    // Subscribe to messages based on the current roomId
    const isLoading = useSubscribe('messages', roomId);

    // Find messages in the current room
    const messages = useFind(() =>
        Messages.find({ roomId }, { sort: { createdAt: 1 } })
    );

    const user = useTracker(() => Meteor.user());

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        const email = user?.emails?.[0]?.address ;

        await Messages.insertAsync({
            text: message,
            roomId,
            userId: user?._id,
            username: email || user?.username || user?.profile?.name || 'Anonymous',
            createdAt: new Date(),
        });

        setMessage('');
    };

    if (isLoading()) {
        return <div>Loading...</div>; // Show a loading state while subscription is not ready
    }

    return (
        <div className="chat-container">
            <ul className="chat-messages">
                {messages.map((msg) => (
                    <li key={msg._id} className="message-item">
                        <span className="message-user">{msg.username}:</span>
                        <span className="message-text">{msg.text}</span>
                        <span className="message-time">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </span>
                    </li>
                ))}
            </ul>

            <form className="chat-form" onSubmit={sendMessage}>
                <input
                    type="text"
                    className="chat-input"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                />
                <button type="submit" className="chat-send-button">
                    Send
                </button>
            </form>
        </div>
)
    ;
};

export default Chat;
