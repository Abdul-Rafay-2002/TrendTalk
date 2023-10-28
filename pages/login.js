import { React, useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { auth } from '@/firebase/firebase';
import {
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
	FacebookAuthProvider,
	sendPasswordResetEmail,
} from 'firebase/auth';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';
import ToastMessage from '@/components/ToastMessage';
import { toast } from 'react-toastify';
import Loader from '@/components/Loader';

const Login = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');  // set the current user email
	const router = useRouter(); //Router to dynamic routing
	const { currentUser, isLoading } = useAuth();  // from context
	const GoogleProvider = new GoogleAuthProvider(); // from FB
	const FacebookProvider = new FacebookAuthProvider(); // from FB


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

	// Login form handler to get all the currentUser data and send into FB with signInwithEmailAndPasssword method
	const submitHandler = async (e) => {
		e.preventDefault();
		const email = e.target[0].value;
		const password = e.target[1].value;
		if (!email || !password) {
			// Display error message: "Email and password are required."
			alert('Email and password are required.');
			return;
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			console.error(error);
		}
	};

	//Sign in with google method from FB
	const signInWithGoogle = async () => {
		try {
			await signInWithPopup(auth, GoogleProvider);
		} catch (error) {
			console.error(error);
		}
	};

	//Sign in with facebook method from FB
	const signInWithFacebook = async () => {
		try {
			await signInWithPopup(auth, FacebookProvider);
		} catch (error) {
			console.error(error);
		}
	};

	//Reset Password functionality and send it to current userEmail and show a toastify popups
	const forgetPassword = async () => {
		try {
			toast.promise(
				async () => {
					//reset login
					await sendPasswordResetEmail(auth, email);
				},
				{
					pending: 'Generating reset link',
					success: `Reset email send to your ${email}`,
					error: 'You may have entered wrong id',
				},
				{
					autoClose: 5000,
				}
			);
		} catch (error) {
			console.error(error);
		}
	};

	// Check if the currentUser is login then not show else show 
	return isLoading || (!isLoading && currentUser) ? (
		<Loader />
	) : (
		<div className='w-full h-full animated-bg'>
			<ToastMessage />
			<div className='h-[100vh] flex justify-center items-center'>
				<div className='flex items-center flex-col glass-effect p-6 m-3'>
					<div className='text-center'>
						<h1 className='text-greyish-100'>Login to Your Account</h1>
						<p className='text-greyish-200'>
							Connecting the World, At anytime and anywhere with TrendTalk
						</p>
					</div>
					<div className='flex items-center flex-col sm:flex-row gap-2 w-full mt-8 mb-5'>
						<div
							onClick={signInWithGoogle}
							className='bg-gradient-to-r from-Sky-200 to-Sky-600 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-Sky-600 hover:to-blue-200'>
							<div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-blue-700 w-full h-full rounded-md'>
								<FcGoogle />
								<span>Login with Google</span>
							</div>
						</div>
						<div
							onClick={signInWithFacebook}
							className='bg-gradient-to-r to-Sky-200 from-Sky-600 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-Sky-600 hover:to-blue-200'>
							<div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-blue-700 w-full h-full rounded-md'>
								<FaFacebookF color='#4267B2' />
								<span>Login with Facebook</span>
							</div>
						</div>
					</div>
					<div className='flex items-center gap-1'>
						<span className='w-8 h-[1px] bg-greyish-300'></span>
						<span className='text-greyish-200 '>OR</span>
						<span className='w-8 h-[1px] bg-greyish-300'></span>
					</div>

					<form
						onSubmit={submitHandler}
						className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
						<input
							type='email'
							placeholder='Email'
							className='w-full h-12 rounded-md outline-none boder-none bg-greyish-400 px-4 text-greyish-100 text-md'
							autoComplete='off'
							onChange={(e) => setEmail(e.target.value)}
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
						<div onClick={forgetPassword} className='text-right w-full my-2'>
							<span className='text-greyish-200  cursor-pointer lexend'>
								Forget Password?
							</span>
						</div>
						<button
							type='submit'
							className='w-full h-14 rounded-md outline-none boder-none bg-gradient-to-r to-Sky-600 from-blue-600 hover:bg-gradient-to-r hover:to-Sky-500 hover:from-blue-700 text-greyish-100 font-semibold  mb-4'>
							Login to your Account
						</button>
					</form>
					<div className='flex justify-center gap-2  mt-1 '>
						<span className='lexend text-greyish-100'>Not a member yet?</span>
						<Link
							href='/register'
							className='lexend underline text-greyish-200'>
							Register Now
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
