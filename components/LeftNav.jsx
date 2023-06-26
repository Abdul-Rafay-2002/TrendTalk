import { React, useState } from 'react';
import { BiEditAlt } from 'react-icons/bi';
import Avatar from './Avatar';
import { useAuth } from '@/context/authContext';
import Icons from './Icons';
import { FaPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const LeftNav = () => {
    const { signOut, currentUser } = useAuth();
    const [editProfil, setEditProfil] = useState(false);

    return (
        <div className='w-[80px] h-[100vh] items-center flex flex-col justify-between py-4 shrink-0 transition-all'>
            {/* Top Header */}
            {/* <div className='w-full text-center'>
                <Image src="/logo.png" width={80} height={80} alt='logo' />
            </div> */}

            {/* Avatar Column */}
            <div className='relative group cursor-pointer p-1 bg-greyish-600 rounded-full'>
                <Avatar size="x-large" user={currentUser} />
                <div className='w-full h-full rounded-full bg-Gray-950/70 absolute top-0 left-0 justify-center items-center hidden group-hover:flex'>
                    <BiEditAlt size={20} className='text-greyish-200' />
                </div>
            </div>
            {/* Bottom icons */}
            <div className='flex gap-5 flex-col items-center'>
                <Icons size="large" className={`bg-greyish-600 hover:bg-Sky-600/60`} icon={<FaPlus size={20} color='#fff' />} onClick={() => { }} />
                <Icons size="large" className={`bg-greyish-600 hover:bg-Sky-600/60`} icon={<BiLogOut size={20} color='#fff' />} onClick={signOut} />
            </div>
        </div>
    )
}

export default LeftNav