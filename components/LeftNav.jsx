import { React, useState } from 'react';
import { BiEditAlt, BiLogOut } from 'react-icons/bi';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import Icons from './Icons';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdPhotoCamera } from "react-icons/md";

const LeftNav = () => {
	const { signOut, currentUser } = useAuth();
	const [editProfile, setEditProfile] = useState(true);
	const editProfileContainer = () => {
		return (
			<div className='relative flex flex-col items-center'>
				<Icons
					size='small'
					className='absolute top-0 right-2 p-2 transition-all hover:bg-Gray-950/50'
					icon={<AiOutlineClose size={20} color='#fff' />}
					onClick={() => setEditProfile(false)}
				/>
				<div className='relative group cursor-pointer p-2 bg-Gray-900 rounded-full'>
					<Avatar size='xx-large' user={currentUser} />
					<div className='w-full h-full rounded-full bg-greyish-600/80 absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
						<Icons size='small' icon={<MdPhotoCamera size={20} color='#fff' />} />
					</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`${editProfile ? 'w-[300px]' : 'w-[80px] items-center'
				} h-[100vh] flex flex-col justify-between py-4 shrink-0 transition-all`}>
			{/* Top Header */}
			{/* <div className='w-full text-center'>
                <Image src="/logo.png" width={80} height={80} alt='logo' />
            </div> */}

			{/* Avatar Column */}
			{editProfile ? (
				editProfileContainer()
			) : (
				<div
					className='relative group cursor-pointer p-1 bg-greyish-600 rounded-full'
					onClick={() => setEditProfile(true)}>
					<Avatar size='x-large' user={currentUser} />
					<div className='w-full h-full rounded-full bg-Gray-950/70 absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
						<BiEditAlt size={20} className='text-greyish-200' />
					</div>
				</div>
			)}
			{/* Bottom icons */}
			<div
				className={`flex gap-5 justify-center  ${editProfile ? '' : 'flex-col items-center'
					}`}>
				<Icons
					size='large'
					className={`bg-greyish-600 hover:bg-Sky-600/60`}
					icon={<FaPlus size={20} color='#fff' />}
					onClick={() => { }}
				/>
				<Icons
					size='large'
					className={`bg-greyish-600 hover:bg-Sky-600/60`}
					icon={<BiLogOut size={20} color='#fff' />}
					onClick={signOut}
				/>
			</div>
		</div>
	);
};

export default LeftNav;
