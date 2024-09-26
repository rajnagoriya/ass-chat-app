import React from 'react';

const ChatArea = ({ messages }) => {
  return (
    <div className="w-3/4 bg-base-100 h-screen flex flex-col p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Chat with Huma Therman</h2>
      </div>
      <div className="flex-grow overflow-y-auto space-y-4">
        {messages.map((message, idx) => (
          <div key={idx} className={`chat ${message.isSender ? 'chat-end' : 'chat-start'}`}>
            <div className={`chat-bubble ${message.isSender ? 'bg-primary text-white' : 'bg-base-200'}`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatArea;
