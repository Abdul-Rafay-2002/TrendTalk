import { React, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import LeftNav from '@/components/LeftNav';
import Chats from '@/components/Chats';
import Chat from '@/components/Chat';
import { useChatContext } from '@/context/chatContext';

const Home = () => {
	const router = useRouter();
	const { currentUser, isLoading } = useAuth();
	const { data } = useChatContext(); //from chat context
	useEffect(() => {
		if (!isLoading && !currentUser) {
			// it means user login
			router.push('/login');
		}
	}, [currentUser, isLoading]);

	return !currentUser ? (
		<Loader />
	) : (
		<div className='bg-Gray-800 h-screen '>
			<div className='flex w-full h-full shrink-0 '>
				{/* left menu  */}
				<LeftNav />
				{/* Chats main column */}
				<div className='flex bg-Gray-950 grow'>
					{/* sidebar */}
					<div className='sm:w-[440px] px-6 py-2 overflow-auto shrink-0 scrollbar border-r-2 shadow-lg shadow-greyish-200/30 border-greyish-300/25'>
						<div className='flex flex-col h-full'>
							<Chats />
						</div> 
					</div>
					{data.user && <Chat />}
				</div>
			</div>
		</div>
	);
};

export default Home;
