import { db } from '@/firebase/firebase';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { RiSearch2Line } from 'react-icons/ri';
import { LuAlertTriangle } from "react-icons/lu";
import Avatar from './Avatar';
const Search = () => {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(false);
	const onKeyUp = async (e) => {
		if (e.code === 'Enter' && !!username) {
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
				<span className='absolute top-[9px] right-6 text-sm text-greyish-100'>
					Enter
				</span>
			</div>
			{err &&
			(
				<>
					<div className='mt-5 w-full text-sm text-Red-200'>
                        <LuAlertTriangle/>
                        User Not Found !!
						<div className='w-full h-[2px] bg-greyish-300/30 mt-2'></div>
					</div>
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
