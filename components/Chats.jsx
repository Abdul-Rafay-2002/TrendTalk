import React, { useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RiSearch2Line } from 'react-icons/ri';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';

const Chats = () => {
	const { user, setUsers, selectedChats, setSelectedChats, chats, setChats } =
		useChatContext();
	const [search, setSearch] = useState('');
	const { currentUser } = useAuth();

	useEffect(() => {
		onSnapshot(collection(db, 'users'), (snapshot) => {
			const updatedUsers = {};
			snapshot.forEach((doc) => {
				updatedUsers[doc.id] = doc.data();
			});
			setUsers(updatedUsers);
		});
	}, []);

	return (
		<div className='flex flex-col h-full'>
			<div className='shrink-0 sticky -top-[20px] text- z-10 flex justify-center w-full py-2'>
				<RiSearch2Line
					size={22}
					className='absolute top-[26px] left-2 text-Gray-100/70'
				/>
				<input
					type='text'
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder='Search username... '
					className='w-full focus:border-[2px] border-blue-500 rounded-xl bg-greyish-500/60 h-14 pl-10 pr-3 outline-none placeholder:text-Gray-100/70 text-Gray-200 font-Roboto '
				/>
			</div>
			<ul className='flex flex-col w-full my-2 gap-1'>
				<li
					className={`h-[90px] flex items-center gap-4 rounded-xl relative hover:bg-blue-500 p-4 cursor-pointer bg-blue-600`}>
					<div className='text-greyish-200 text-xs font-semibold font-Roboto absolute right-4 top-2'>
						11:41
					</div>
					<div className='rounded-full border-Gray-950 border-[4px] '>
						<Avatar size='x-large' user={currentUser} className='' />
					</div>
					<div className='flex flex-col gap-0 grow relative'>
						<span className='text-greyish-100 font-Poppins flex items-center justify-between'>
							<div>{currentUser.displayName}</div>
						</span>

						<p className='text-sm max-w-[200px] text-greyish-200/60 font-Lexend line-clamp-1 break-all'>
							Last Message Last Message Last Message Last Message
						</p>
						<div className='absolute bottom-1 right-0 text-greyish-200 p-1 bg-Red-200 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-semibold'>
							5
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Chats;
