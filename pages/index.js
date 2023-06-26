import { React, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import LeftNav from '@/components/LeftNav';

const Home = () => {
  const router = useRouter();
  const { currentUser, isLoading } = useAuth();
  useEffect(() => {
    if (!isLoading && !currentUser) {
      // it means user login 
      router.push("/login");
    }

  }, [currentUser, isLoading]);

  return !currentUser ? (
    <Loader />
  ) : (
    <div className='bg-Gray-800 h-[100vh]'>
      <div className='flex w-full h-full shrink-0 '>
        {/* left menu  */}
        <LeftNav />
        {/* Chats main column */}
        <div className='flex bg-Gray-950 grow'>
          {/* sidebar */}
          <div>Sidebar Section</div>
          <div>Chat Section</div>
        </div>
      </div>
    </div>
  )
}

export default Home;