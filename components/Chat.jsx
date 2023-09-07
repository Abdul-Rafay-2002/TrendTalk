import React from 'react';
import ChatHeader from './ChatHeader';
import Messages from './Messages';
import { useChatContext } from '@/context/chatContext';
import ChatFooter from './ChatFooter';
import { useAuth } from '@/context/authContext';

const Chat = () => {
	const { data, users } = useChatContext();
	const { currentUser } = useAuth();

	//when the user is block
	const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
		(u) => u === data.user.uid
	);

	//when the currentUser is block
	const iamBlocked = users[data.user.uid]?.blockedUsers?.find(
		(u) => u === currentUser.uid
	);
	return (
		<div className='flex flex-col p-5 grow'>
			<ChatHeader />
			{data.chatId && <Messages />}
			{!isUserBlocked && !iamBlocked && <ChatFooter />}
			{isUserBlocked && (
				<div className='w-full text-center text-greyish-100/50 py-5 text-sm'>
					This user has been blocked.
				</div>
			)}

			{iamBlocked && (
				<div className='w-full text-center text-greyish-100/50 py-5 text-sm'>{`${data.user.displayName} has been blocked you.`}</div>
			)}
		</div>
	);
};

export default Chat;
