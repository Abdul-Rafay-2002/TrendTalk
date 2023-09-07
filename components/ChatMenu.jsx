import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { db } from '@/firebase/firebase';
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import ClickAwayListener from 'react-click-away-listener';

const ChatMenu = ({ showMenu, setShowMenu }) => {
	const { currentUser } = useAuth();
	const { data, users } = useChatContext();
	const handleClickAway = () => {
		setShowMenu(false);
	};

	//when the user is block
	const isUserBlocked = users[currentUser.uid]?.blockedUsers?.find(
		(u) => u === data.user.uid
	);

	//when the currentUser is block
	const iamBlocked = users[data.user.uid]?.blockedUsers?.find(
		(u) => u === currentUser.uid
	);
	const handleBlock = async (action) => {
		if (action === 'block') {
			await updateDoc(doc(db, 'users', currentUser.uid), {
				blockedUsers: arrayUnion(data.user.uid),
			});
		}
		if (action === 'unblock') {
			await updateDoc(doc(db, 'users', currentUser.uid), {
				blockedUsers: arrayRemove(data.user.uid),
			});
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
									handleBlock(isUserBlocked ? 'unblock' : 'block' );
								}}>
								{isUserBlocked ? 'Unblock User' : 'Block User'}
							</li>
						)}
						<li className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-greyish-400 hover:text-greyish-100 font-semibold'>
							Delete Chat
						</li>
					</ul>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default ChatMenu;
