"use client"
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';
import MessageInput from '../components/MessageInput';
import NavBar from '../components/NavBar';
import { useEffect } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  const contacts = [
    { name: 'Morgan Freeman', lastMessage: 'Please send some...' },
    { name: 'Charlie Chaplin', lastMessage: 'Hello mike, thank...' },
    { name: 'Winston Churchill', lastMessage: 'Show me what re...' },
    { name: 'Boss Baby', lastMessage: 'Meeting in the mo...' },
  ];

  const messages = [
    { text: 'Hey, just a reminder...', isSender: false },
    { text: 'Haha, this joke is hilarious...', isSender: true },
    { text: 'Anyways, I am working on something...', isSender: true },
  ];

  // Logout function to handle user logout
  const handleLogout = () => {
    Cookies.remove('ChatAppAuthToken');
    router.push('/login');  // Redirect to login after logout
  };

  useEffect(() => {
    const token = Cookies.get('ChatAppAuthToken');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex flex-col h-screen bg-base-100">
      <NavBar onLogout={handleLogout} className=""/>

      <div className="flex flex-grow">
        <Sidebar contacts={contacts} />
        <div className="flex flex-col w-3/4 h-screen">
          <ChatArea messages={messages} />
          <MessageInput />
        </div>
      </div>
    </div>
  );
}
