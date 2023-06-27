import { React, useState } from 'react';
import { BiCheck, BiEditAlt, BiLogOut } from 'react-icons/bi';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import Icons from './Icons';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdAddAPhoto, MdDelete, MdPhotoCamera } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { profileColors } from '@/utils/constants';

const LeftNav = () => {
	const { signOut, currentUser } = useAuth();
	const [editProfile, setEditProfile] = useState(true);
	const [nameEdited, setNameEdited] = useState(false);

	//OnkeyUp Method Which allow to check with condition that if the currentUser Name will edit and else is not editied.
	const onkeyup = (e) => {
		if (e.target.innerText.trim() !== currentUser.displayName) {
			//Name is edited
			setNameEdited(true);
		} else {
			//Name isn't edited
			setNameEdited(false);
		}
	};

	//OnKeyDown Method Which dont allow to the user to move on the next line.
	const onkeydown = (e) => {
		if (e.key === 'Enter' && e.keyCode === 13) {
			e.preventDefault();
		}
	};

	const editProfileContainer = () => {
		return (
			<div className='relative flex flex-col items-center'>
				<Icons
					size='small'
					className='absolute top-0 right-2 p-2 transition-all hover:bg-Gray-700/50'
					icon={<AiOutlineClose size={20} color='#fff' />}
					onClick={() => setEditProfile(false)}
				/>
				<div className='relative group cursor-pointer p-2 bg-Gray-900 rounded-full'>
					<Avatar size='xx-large' user={currentUser} />
					<div className='w-full h-full rounded-full bg-greyish-600/80 absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
						<label htmlFor='fileUpload' style={{ cursor: 'pointer' }}>
							{currentUser.photoURL ? (
								<MdPhotoCamera size={30} color='#ccc' />
							) : (
								<MdAddAPhoto size={30} color='#ccc' />
							)}
						</label>
						<input
							type='file'
							id='fileUpload'
							onChange={(e) => { }}
							style={{ display: 'none' }}
						/>
					</div>
					{currentUser.photoURL && (
						<div className='w-6 h-6 rounded-full bg-Red-200 flex justify-center items-center absolute right-0 bottom-0 '>
							<MdDelete size={18} color='#fff' />
						</div>
					)}
				</div>
				<div className='text-center mt-4'>
					<div className='flex items-center justify-start w-[211px]'>
						{!nameEdited && <BiEditAlt className='text-Sky-50' />}
						{nameEdited && (
							<BsFillCheckCircleFill
								className='text-limegreen-300 cursor-pointer'
								onClick={() => { }}
							/>
						)}
						<h4
							contentEditable="true" 
							className='text-greyish-100 outline-none border-none whitespace-nowrap overflow-hidden text-ellipsis pl-3'
							id='diplayNameEditable'
							onKeyUp={onkeyup}
							onKeyDown={onkeydown}>
							{currentUser.displayName}
						</h4>
					</div>
					<span className='text-Sky-500/90'>{currentUser.email}</span>
				</div>
				<div className='grid grid-cols-5 gap-4 mt-6'>
					{profileColors.map((color, index) => (
						<span
							key={index}
							className='w-8 h-8 border-2 border-greyish-500 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125'
							style={{ backgroundColor: color, boxShadow: `0 0 10px 0px ${color}` }}>
							{color === currentUser.color && <BiCheck size={20} color='#fff' />}
						</span>
					))}
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
					className={`bg-greyish-600 hover:bg-Sky-500`}
					icon={<FaPlus size={20} color='#fff' />}
					onClick={() => { }}
				/>
				<Icons
					size='large'
					className={`bg-greyish-600 hover:bg-Sky-500`}
					icon={<BiLogOut size={20} color='#fff' />}
					onClick={signOut}
				/>
			</div>
		</div>
	);
};

export default LeftNav;
