import { React, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';
import { auth, db } from '@/firebase/firebase';
import {
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import { doc, setDoc } from 'firebase/firestore';
import { profileColors } from '@/utils/constants';
import Loader from '@/components/Loader';

const GoogleProvider = new GoogleAuthProvider(); // from FB
const FacebookProvider = new FacebookAuthProvider(); // from FB

const Register = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [password, setPassword] = useState('');
	const router = useRouter(); //Router to dynamic routing
	const { currentUser, isLoading } = useAuth(); // from context

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	// Check if current user is login then removed loader and redirect to the homepage.
	useEffect(() => {
		if (!isLoading && currentUser) {
			// it means user login
			router.push('/');
		}
	}, [currentUser, isLoading]);

	// Rigester form handler to get all the currentUser data and send into FB with createUserWithEmailAndPassword method
	const registerHandler = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const colorIndex = Math.floor(Math.random() * profileColors.length);
		if (!displayName || !email || !password) {
			// Display error message: "Email and password are required."
			alert('Username Email and password are required.');
			return;
		}
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			// here are the user collection of FB
			await setDoc(doc(db, 'users', user.uid), {
				uid: user.uid,
				displayName,
				email,
				password,
				color: profileColors[colorIndex],
			});

			// here is the userChats collection of FB
			await setDoc(doc(db, 'userChats', user.uid), {});

			// updating userProfile for current user only for FB
			await updateProfile(user, { displayName });

			console.log({ user });
			router.push('/');
		} catch (error) {
			console.error(error);
		}
	};

	// SignIn with google method from FB
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, GoogleProvider);
		} catch (error) {
			console.error(error);
		}
	};

	// SignIn with Facebook method From FB
	const signInWithFacebook = async () => {
		try {
			await signInWithPopup(auth, FacebookProvider);
		} catch (error) {
			console.error(error);
		}
	};

	// Check if the currentUser is login then not show else show
	return isLoading || (!isLoading && currentUser) ? (
		<Loader />
	) : (
		<>
			<div className='w-full h-full animated-bg'>
				<div className='h-[100vh] flex justify-center items-center'>
					<div className='flex items-center flex-col glass-effect p-6 m-3'>
						<div className='text-center'>
							<h1 className='text-greyish-100'>Create New Account</h1>
							<p className='text-greyish-200'>
								Join the Conversation, Create Your Account Today!
							</p>
						</div>
						<div className='flex items-center flex-col sm:flex-row gap-2 w-full mt-8 mb-5'>
							<div
								onClick={signInWithGoogle}
								className='bg-gradient-to-r from-Sky-200 to-Sky-600 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-Sky-600 hover:to-blue-200'>
								<div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-blue-700 w-full h-full rounded-md'>
									<FcGoogle />
									<span>Signup with Google</span>
								</div>
							</div>
							<div
								onClick={signInWithFacebook}
								className='bg-gradient-to-r to-Sky-200 from-Sky-600 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-Sky-600 hover:to-blue-200'>
								<div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-blue-700 w-full h-full rounded-md'>
									<FaFacebookF color='#4267B2' />
									<span>Signup with Facebook</span>
								</div>
							</div>
						</div>
						<div className='flex items-center gap-1'>
							<span className='w-8 h-[1px] bg-greyish-300'></span>
							<span className='text-greyish-200 '>OR</span>
							<span className='w-8 h-[1px] bg-greyish-300'></span>
						</div>

						<form
							onSubmit={registerHandler}
							className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
							<input
								type='text'
								placeholder='User name'
								className='w-full h-12 rounded-md outline-none border-none bg-greyish-400 px-4 text-greyish-100 text-md'
								autoComplete='off'
							/>
							<input
								type='email'
								placeholder='Email'
								className='w-full h-12 rounded-md outline-none border-none bg-greyish-400 px-4 text-greyish-100 text-md'
								autoComplete='off'
							/>
							<div className='relative w-full'>
								<input
									type={passwordVisible ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder='Password'
									className='w-full h-12 rounded-md outline-none boder-none bg-greyish-400 px-4 text-greyish-100 text-md'
									autoComplete='off'
								/>
								<span className='absolute right-2 top-4 text-greyish-200'>
									{passwordVisible ? <HiEyeOff size={20} onClick={togglePasswordVisibility} className='text-greyish-200/80' /> : <HiEye size={20} onClick={togglePasswordVisibility} className='text-greyish-200/40' />}
								</span>

							</div>

							<button
								type='submit'
								className='w-full h-14 rounded-md outline-none boder-none bg-gradient-to-r to-Sky-600 from-blue-600 hover:bg-gradient-to-r hover:to-Sky-500 hover:from-blue-700 text-greyish-100 font-semibold  m-4'>
								Sign up
							</button>
						</form>
						<div className='flex justify-center gap-2 mt-1'>
							<span className=' text-greyish-100 lexend'>
								Already have an account?
							</span>
							<Link href='/login' className=' underline text-greyish-200 lexend'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
