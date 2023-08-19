import React, { useEffect, useState } from 'react';
import { useChatContext } from '@/context/chatContext';
import { Timestamp, collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import { RiSearch2Line } from 'react-icons/ri';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import { formatDate } from '@/utils/helpers';

const Chats = () => {
	const {
		users,
		setUsers,
		selectedChat,
		setSelectedChat,
		chats,
		setChats,
		dispatch,
	} = useChatContext();
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
	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				if (doc.exists()) {
					const data = doc.data();
					setChats(data);
				}
			});
		};
		currentUser.uid && getChats();
	}, []);
	const filterChats = Object.entries(chats || {}).sort(
		(a, b) => b[1].date - a[1].date
	);
	const handleSelect = (user, selectedChatId) => {
		setSelectedChat(user);
		dispatch({ type: "CHANGE_USER", payload: user });

		// if (unreadMsgs?.[selectedChatId]?.length > 0) {
		// 	readChat(selectedChatId);
		// }
	};
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
				{Object.keys(users || {}).length > 0 &&
					filterChats?.map((chat) => {
						const timestamp = new Timestamp(
							chat[1].data?.seconds,
							chat[1].data?.nanoseconds
						);
						const date = timestamp.toDate();
						const user = users[chat[1].userInfo.uid];

						return (
							<li
								key={chat[0]}
								onClick={() => handleSelect(user, chat[0])}
								className={`h-[90px] flex items-center gap-4 rounded-xl relative hover:bg-blue-500 p-4 cursor-pointer ${
									selectedChat?.uid === user.uid ? 'bg-blue-600' : ''
								}`}>
								<div className='text-greyish-200 text-xs font-semibold font-Roboto absolute right-4 top-2'>
									{formatDate(date)}
								</div>
								<div className='rounded-full border-Gray-950 border-[4px] '>
									<Avatar size='x-large' user={user} className='' />
								</div>
								<div className='flex flex-col gap-0 grow relative'>
									<span className='flex items-center justify-between'>
										<h6 className='text-greyish-100'>{user?.displayName}</h6>
									</span>
									<p className='text-sm max-w-[200px] text-greyish-200/60 font-Lexend line-clamp-1 break-all'>
										{chat[1]?.lastMessage?.text ||
											(chat[1]?.lastMessage?.img && 'image') ||
											'Send first message'}
									</p>
									<div className='absolute bottom-1 right-0 text-greyish-200 p-1 bg-Red-100 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-semibold'>
										5
									</div>
								</div>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default Chats;
