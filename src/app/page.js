"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import Loader from './components/loader';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('ChatAppAuthToken');
        if (!token) {
          router.push('/signup');
        } else {
          // If token exists, validate and redirect to dashboard
          const response = await axios.get('/api/users/auth/validateToken', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            router.push('/dashboard');
          } else {
            toast.error("plese login!!!")
            router.push('/login');
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        router.push('/signup');
      }
    };
    
    checkAuth();
  }, [router]);

  return <main><Loader/></main>;
}
