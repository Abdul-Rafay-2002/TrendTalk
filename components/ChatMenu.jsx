import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import {
	arrayRemove,
	arrayUnion,
	doc,
	getDoc,
	updateDoc,
} from 'firebase/firestore';
import React from 'react';
import ClickAwayListener from 'react-click-away-listener';

const ChatMenu = ({ showMenu, setShowMenu }) => {
	const { data, users, chats, dispatch, setSelectedChat } = useChatContext();
	const { currentUser } = useAuth();

	//when the user is block
	const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
		(u) => u === data.user.uid
	);

	//when the currentUser is block
	const iamBlocked = users[data.user.uid]?.blockedUsers?.find(
		(u) => u === currentUser.uid
	);

	//this method will set the state as default to false
	const handleClickAway = () => {
		setShowMenu(false);
	};
 
	const handleBlock = async (type) => {
		if (type === "block") {
			await updateDoc(doc(db, "users", currentUser.uid), {
				blockedUsers: arrayUnion(data.user.uid),
			});
		}
		if (type === "unblock") {
			await updateDoc(doc(db, "users", currentUser.uid), {
				blockedUsers: arrayRemove(data.user.uid),
			});
		}
	};

	const handleDelete = async () => {
		try {
			const chatRef = doc(db, "chats", data.chatId);

			// Retrieve the chat document from Firestore
			const chatDoc = await getDoc(chatRef);

			// Create a new "messages" array that excludes the message with the matching ID
			const updatedMessages = chatDoc.data().messages.map((message) => {
				message.deleteChatInfo = {
					...message.deleteChatInfo,
					[currentUser.uid]: true,
				};
				return message;
			});

			// Update the chat document in Firestore with the new "messages" array
			await updateDoc(chatRef, { messages: updatedMessages });

			await updateDoc(doc(db, "userChats", currentUser.uid), {
				[data.chatId + ".chatDeleted"]: true,
			});

			const chatId = Object.keys(chats || {}).filter(
				(id) => id !== data.chatId
			);

			const filteredChats = Object.entries(chats || {})
				.filter(([id, chat]) => id !== data.chatId)
				.sort((a, b) => b[1].date - a[1].date);

			if (filteredChats.length > 0) {
				setSelectedChat(filteredChats[0][1].userInfo);
				dispatch({
					type: "CHANGE_USER",
					payload: filteredChats[0][1].userInfo,
				});
			} else {
				dispatch({ type: "EMPTY" });
			}
		} catch (err) {
			console.error(err);
		}
	};
	
	return (
		<ClickAwayListener onClickAway={handleClickAway} className=''>
			<div className='arrow'>
				<div className='w-[180px] absolute top-[55px] right-0 bg-greyish-500 rounded-md overflow-hidden z-20'>
					<ul className='p-2 flex flex-col text-greyish-100/80 '>
						{!iamBlocked && (
							<li
								className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-greyish-400 hover:text-greyish-100 font-semibold'
								onClick={(e) => {
									e.stopPropagation();
									handleBlock(isUserBlocked ? 'unblock' : 'block');
								}}>
								{isUserBlocked ? 'Unblock User' : 'Block User'}
							</li>
						)}
						<li
							className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-greyish-400 hover:text-greyish-100 font-semibold'
							onClick={(e) => {
								e.stopPropagation();
								handleDelete();
								setShowMenu(false);
							}}>
							Delete Chat
						</li>
					</ul>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default ChatMenu;
