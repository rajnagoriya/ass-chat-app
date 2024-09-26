import React from 'react';

const Sidebar = ({ contacts }) => {
  return (
    <div className="w-1/4 bg-base-200 h-screen p-4">
      <h2 className="text-lg font-bold mb-4">Frequent Contacts</h2>
      <ul className="space-y-2">
        {contacts.map((contact, idx) => (
          <li key={idx} className="mb-2 flex items-center space-x-3">
            <div className="avatar">
              <div className="w-10 rounded-full bg-gray-400"></div>
            </div>
            <div className="flex-grow">
              <p className="font-semibold">{contact.name}</p>
              <p className="text-sm text-gray-500 truncate">{contact.lastMessage}</p>
            </div>
            <div className="badge badge-primary badge-sm">1</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
