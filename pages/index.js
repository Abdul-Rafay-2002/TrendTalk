import { React, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import LeftNav from '@/components/LeftNav';
import Chats from '@/components/Chats';

const Home = () => {
	const router = useRouter();
	const { currentUser, isLoading } = useAuth();
	useEffect(() => {
		if (!isLoading && !currentUser) {
			// it means user login
			router.push('/login');
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
					<div className='w-[440px] px-6 py-2 overflow-auto shrink-0 scrollbar border-r-2 shadow-lg shadow-greyish-200/30 border-greyish-300/25'>
						<div className='flex flex-col h-full'>
							<Chats />
						</div>
					</div>
					<div>Chat Section</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
