import {React, useEffect, useState} from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';
import { auth } from '@/firebase/firebase';
import {
    GoogleAuthProvider,
    signInWithPopup,
    FacebookAuthProvider,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/router';

const Register = () => {
    const router = useRouter();
    const { currentUser, isLoading } = useAuth();
    const GoogleProvider = new GoogleAuthProvider();
    const FacebookProvider = new FacebookAuthProvider();

    useEffect(() => {
        if (!isLoading && currentUser) {
            // it means user login
            router.push('/');
        }
    }, [currentUser, isLoading]);

    const registerHandler = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        if (!displayName || !email || !password) {
            // Display error message: "Email and password are required."
            alert('Username Email and password are required.');
            return;
        }
        try {
           const {user} =  await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile (user, {displayName});
           console.log({user});
        } catch (error) {
            console.error(error);
        }
    };
    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, GoogleProvider);
        } catch (error) {
            console.error(error);
        }
    };
    const signInWithFacebook = async () => {
        try {
            await signInWithPopup(auth, FacebookProvider);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading || (!isLoading && currentUser) ? (
        'loading.....'
    ) : (
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
                        <div onClick={signInWithGoogle} className='bg-gradient-to-r from-limegreen-200 to-limegreen-400 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-limegreen-400 hover:to-limegreen-200'>
                            <div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-limegreen-500 w-full h-full rounded-md'>
                                <FcGoogle />
                                <span>Signup with Google</span>
                            </div>
                        </div>
                        <div onClick={signInWithFacebook} className='bg-gradient-to-r from-limegreen-200 to-limegreen-400 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-limegreen-400 hover:to-limegreen-200'>
                            <div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-limegreen-500 w-full h-full rounded-md'>
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

                    <form onSubmit={registerHandler} className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
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
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full h-12 rounded-md outline-none border-none bg-greyish-400 px-4 text-greyish-100 text-md'
                            autoComplete='off'
                        />
                        
                        <button
                            type='submit'
                            className='w-full h-14 rounded-md outline-none border-none bg-gradient-to-r from-limegreen-200 to-limegreen-500 hover:bg-gradient-to-r hover:to-limegreen-500 hover:from-limegreen-400 text-greyish-100 font-semibold  m-4'>
                            Sign up
                        </button>
                    </form>
                    <div className='flex justify-center gap-2 mt-1'>
                        <span className=' text-greyish-100 lexend'>Already have an account?</span>
                        <Link href='/login' className=' underline text-greyish-200 lexend'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;