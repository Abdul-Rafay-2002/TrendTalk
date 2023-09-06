import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import { DELETED_FOR_ME } from '@/utils/constants';
import { useAuth } from '@/context/authContext';

const Messages = () => {
	const { data } = useChatContext();
	const [messages, setMessages] = useState([]);
	const ref = useRef();
	const { currentUser } = useAuth();

	const scrollToBottom = () => {
		const charContainer = ref.current;
		charContainer.scrollTop = charContainer.scrollHeight;
	};

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			if (doc.exists) {
				setMessages(doc.data().messages);
			}

			setTimeout(() => {
				scrollToBottom();
			}, 0);
		});
    
		return () => unsub();
	}, [data.chatId]);

	return (
		<div
			ref={ref}
			className='grow text-greyish-100  p-5 overflow-auto scrollbar flex flex-col'>
			{messages
				?.filter((m) => {
					return (
						m?.deletedInfo?.[currentUser.uid] !== DELETED_FOR_ME &&
						!m?.deletedInfo?.deletedForEveryone &&
						!m?.deletedInfo?.[currentUser.uid]
					);
				})
				?.map((m) => {
					return <Message message={m} key={m.id} />;
				})}
		</div>
	);
};

export default Messages;
