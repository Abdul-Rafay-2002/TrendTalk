import { db } from '@/firebase/firebase';
import { collection, deleteField, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { LuAlertTriangle } from "react-icons/lu";
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';


const Search = () => {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(false);
	const { currentUser } = useAuth();
	const { dispatch } = useChatContext();
	const onKeyUp = async (e) => {
		if (e.code === 'Enter' && !!username){
			try {
				setErr(false);
				const usersRef = collection(db, 'users');
				const q = query(usersRef, where('displayName', '==', username));

				const querySnapshot = await getDocs(q);
				if (querySnapshot.empty) {
					setErr(true);
					setUser(null);
				} else {
					querySnapshot.forEach((doc) => {
						setUser(doc.data());
					});
				}
			} catch (error) {
				console.error(error);
				setErr(error);
			}
		}
	};
	const handleSelect = async () => {
		try {
			const combinedId =
				currentUser.uid > user.uid
					? currentUser.uid + user.uid
					: user.uid + currentUser.uid;

			const res = await getDoc(doc(db, 'chats', combinedId));

			if (!res.exists()) {
				// Chat Document doesn't Exsist
				await setDoc(doc(db, 'chats', combinedId), { message: [] });
				const currentUserChatRef = await getDoc(
					doc(db, 'userChats', currentUser.uid)
				);
				const UserChatRef = await getDoc(doc(db, 'userChats', user.uid));
				if (!currentUserChatRef.exists()) {
					// Create new chat document for current user
					await setDoc(doc(db, 'userChats', currentUser.uid), {});
				}
				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + ".userInfo"]: {
						uid: user.uid,
						displayName: user.displayName,
						photoURL: user.photoURL || null,
						color: user.color
					},
					[combinedId + ".data"]: serverTimestamp()
				});
				if (!UserChatRef.exists()) {
					// Create new chat document for user
					await setDoc(doc(db, 'userChats', user.uid), {});
				}
				await updateDoc(doc(db, "userChats", user.uid), {
					[combinedId + ".userInfo"]: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
						photoURL: currentUser.photoURL || null,
						color: currentUser.color
					},
					[combinedId + ".data"]: serverTimestamp(),
				});
			}
			else {
				// Chat Document Exsist
				await updateDoc(doc(db, "userChats", currentUser.uid), {
					[combinedId + '.chatDeleted']: deleteField(),
				})
			}
			setUser(null);
			setUsername('');
			dispatch({ type: 'CHANGE_USER', payload: user })
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<div className='shrink-0'>
			<div className='relative border-b-4 border-greyish-300'>
				<RiSearch2Line className='absolute top-[11px] left-6 text-greyish-100' />
				<input
					type='text'
					placeholder='Search User'
					onChange={(e) => setUsername(e.target.value)}
					onKeyUp={onKeyUp}
					value={username}
					autoFocus
					className='w-full h-10 bg-greyish-400 outline-none text-base text-greyish-100 pr-12 px-12 placeholder:text-greyish-200'
				/>
				<span className='absolute top-[9px] right-6 text-sm text-greyish-100 cursor-pointer'>
					Enter
				</span>
			</div>
			{err &&
			(
				<>
					<div className='mt-5 w-full text-sm text-Red-200 flex items-center pl-8 gap-3 pb-2 '>
                        <LuAlertTriangle size={22} />
						<p className='font-bold'>User Not Found !!</p>
					</div>
					<div className='w-full h-[2px] bg-greyish-300/30 mt-2 '></div>
				</>
			)}
			{user && (
				<>
					<div
						key={user.uid}
						className='flex items-center gap-4 rounded-xl p-3 mx-4 cursor-pointer hover:bg-greyish-400'
						onClick={() => handleSelect(user)}>
						<Avatar size='x-large' user={user} />
						<div className='flex flex-col'>
							<h5 className='text-Gray-50 text-lg font-Poppins font-semibold'>
								{user.displayName}
							</h5>
							<p className='text-Gray-500'>{user.email}</p>
						</div>
					</div>
					<div className='w-full h-[2px] bg-greyish-300/30 mt-2'></div>
				</>
			)}
		</div>
	);
};

export default Search;
