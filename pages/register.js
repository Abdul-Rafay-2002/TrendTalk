import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import Link from 'next/link';

const Register = () => {
    return (
        <div className='w-full h-full animated-bg'>
            <div className='h-[100vh] flex justify-center items-center'>
                <div className='flex items-center flex-col glass-effect p-6 mx-3'>
                    <div className='text-center'>
                        <h1 className='text-greyish-100'>Create New Account</h1>
                        <p className='text-greyish-200'>
                            Join the Conversation, Create Your Account Today!
                        </p>
                    </div>
                    <div className='flex items-center flex-col sm:flex-row gap-2 w-full mt-8 mb-5'>
                        <div className='bg-gradient-to-r from-limegreen-200 to-limegreen-400 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-limegreen-400 hover:to-limegreen-200'>
                            <div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-limegreen-500 w-full h-full rounded-md'>
                                <FcGoogle />
                                <span>Login with Google</span>
                            </div>
                        </div>
                        <div className='bg-gradient-to-r from-limegreen-200 to-limegreen-400 w-full md:w-1/2 h-14 rounded-md cursor-pointer p-[2px] hover:from-limegreen-400 hover:to-limegreen-200'>
                            <div className='flex items-center justify-center gap-3 text-greyish-100 font-semibold bg-limegreen-500 w-full h-full rounded-md'>
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

                    <form className='flex flex-col items-center justify-center gap-3 mt-5 w-full'>
                        <input
                            type='text'
                            placeholder='Username'
                            className='w-full h-12 rounded-md outline-none boder-none bg-greyish-400 px-4 text-greyish-100 text-md'
                            autoComplete='off'
                        />
                        <input
                            type='email'
                            placeholder='Email'
                            className='w-full h-12 rounded-md outline-none boder-none bg-greyish-400 px-4 text-greyish-100 text-md'
                            autoComplete='off'
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            className='w-full h-12 rounded-md outline-none boder-none bg-greyish-400 px-4 text-greyish-100 text-md'
                            autoComplete='off'
                        />
                        
                        <button
                            type='submit'
                            className='w-full h-14 rounded-md outline-none boder-none bg-gradient-to-r from-limegreen-200 to-limegreen-500 hover:bg-gradient-to-r hover:to-limegreen-500 hover:from-limegreen-400 text-greyish-100 font-semibold  m-4'>
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