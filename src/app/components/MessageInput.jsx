import React from 'react';

const MessageInput = () => {
  return (
    <div className="p-4 bg-base-200 flex items-center space-x-4">
      <input
        type="text"
        placeholder="Type your message..."
        className="input input-bordered w-full"
      />
      <button className="btn btn-primary">Send</button>
    </div>
  );
};

export default MessageInput;
