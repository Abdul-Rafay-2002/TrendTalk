import { React, useState } from 'react';
import { BiCheck, BiSolidEdit, BiLogOut } from 'react-icons/bi';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import Icons from './Icons';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { MdAddAPhoto, MdDelete, MdPhotoCamera } from 'react-icons/md';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { profileColors } from '@/utils/constants';
import { toast } from 'react-toastify';
import ToastMessage from '@/components/ToastMessage';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db, auth, storage, } from '@/firebase/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import UsersPopup from './popup/UsersPopup';


const LeftNav = () => {
	const { signOut, currentUser, setCurrentUser } = useAuth();
	const [editProfile, setEditProfile] = useState(false);
	const [usersPopup, setUsersPopup] = useState(false);
	const [nameEdited, setNameEdited] = useState(false);
	const authUser = auth.currentUser;

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
	//Uploading image to firstore with the local directory of users
	const uploadingImageToFirestore = (file) => {
		try {
			if (file) {
				// if file has uploading then this logic from FB
				const storageRef = ref(storage, currentUser.displayName);
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on('state_changed',
					(snapshot) => {
						const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
						console.log('Upload is ' + progress + '% done');
						switch (snapshot.state) {
							case 'paused':
								console.log('Upload is paused');
								break;
							case 'running':
								console.log('Upload is running');
								break;
						}
					},
					(error) => {
						// Handle unsuccessful uploads
						console.error(error);
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
							console.log('File available at', downloadURL);
							updateProfileHandler("photo", downloadURL);
							await updateProfile(authUser, {
								photoURL: downloadURL,
							});
						});
					}
				);
			}
		} catch (error) {
			console.error(error);
		}
	}

	//Update Profile methods with one handler
	const updateProfileHandler = (type, value) => {
		let obj = { ...currentUser };
		switch (type) {
			//Changing the bgColors with grid profile colors
			case 'color':
				obj.color = value;
				break;

			//Edit the name of profile
			case 'name':
				obj.displayName = value;
				break;

			//uploade the custom photo in profile
			case 'photo':
				obj.photoURL = value;
				break;

			//Remove the custom profile photo
			case 'photo-remove':
				obj.photoURL = null;
				break;

			default:
				break;
		}
		try {
			toast.promise(
				async () => {
					const userDocRef = doc(db, 'users', currentUser.uid);
					await updateDoc(userDocRef, obj);
					setCurrentUser(obj);

					if (type === 'photo-remove') {
						await updateProfile(authUser, {
							photoURL: null,
						});
					}
					if (type === 'name') {
						await updateProfile(authUser, {
							displayName: value,
						});
						setNameEdited(false);
					}
					// if (type === "name"){
					// 	await updatePassword(authUser, {
					// 		displayName: value,

					// 	})
					// }
				},
				{
					pending: 'Updating Profile',
					success: `Profile Updated Successfully`,
					error: 'Profile Updated failed',
				},
				{
					autoClose: 3000,
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	const editProfileContainer = () => {
		return (
			<div className='relative flex flex-col items-center'>
				<ToastMessage />
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
							onChange={(e) => uploadingImageToFirestore(e.target.files[0])}
							style={{ display: 'none' }}
						/>
					</div>
					{currentUser.photoURL && (
						<div className='w-6 h-6 rounded-full bg-Red-100 border-[5px] border-Gray-800 flex justify-center items-center absolute right-1 bottom-1'
							onClick={() => { updateProfileHandler("photo-remove") }}
						>
							<MdDelete size={12} color='#fff' />
						</div>
					)}
				</div>
				<div className='text-center mt-4'>
					<div className='flex items-center justify-center w-[300px]'>
						{!nameEdited && <BiSolidEdit className='text-Sky-50' />}
						{nameEdited && (
							<BsFillCheckCircleFill
								className='text-Sky-600 cursor-pointer'
								onClick={() => {
									updateProfileHandler(
										'name',
										document.getElementById('diplayNameEditable').innerText
									);
								}}
							/>
						)}
						<h4
							contentEditable='true'
							className='text-greyish-100 outline-none border-none whitespace-nowrap overflow-hidden text-ellipsis pl-[0.3rem]'
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
							style={{
								backgroundColor: color,
								boxShadow: `0 0 10px 0px ${color}`,
							}}
							onClick={() => {
								updateProfileHandler('color', color);
							}}>
							{color === currentUser.color && (
								<BiCheck size={20} color='#fff' />
							)}
						</span>
					))}
				</div>
			</div>
		);
	};

	return (
		<div
			className={`${editProfile ? 'w-[20rem]' : 'w-[80px] items-center'
				} h-[100vh] flex flex-col justify-between py-4 shrink-0 transition-all`}>
			{/* Top Header */}

			{/* Avatar Column */}
			{editProfile ? (
				editProfileContainer()
			) : (
				<div
					className='relative group cursor-pointer p-1 bg-greyish-600 rounded-full'
					onClick={() => setEditProfile(true)}>
					<Avatar size='x-large' user={currentUser} />
					<div className='w-full h-full rounded-full bg-Gray-950/70 absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
						<BiSolidEdit size={20} className='text-greyish-200' />
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
					onClick={() => setUsersPopup(!usersPopup)}
				/>
				<Icons
					size='large'
					className={`bg-greyish-600 hover:bg-Sky-500`}
					icon={<BiLogOut size={20} color='#fff' />}
					onClick={signOut}
				/>
			</div>
			{usersPopup && <UsersPopup onHide={() => setUsersPopup(false)} title='Find Users' />}
		</div>
	);
};

export default LeftNav;
