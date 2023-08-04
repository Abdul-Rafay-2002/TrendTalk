import React from 'react';
import PopupWrapper from './PopupWrapper';
import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import Avatar from '../Avatar';

const UsersPopup = (props) => {
    const { currentUser } = useAuth();
    const { users } = useChatContext();
    return (
        <PopupWrapper {...props}>
            <div className='mt-5 flex flex-col grow gap-2 relative overflow-auto scrollbar'>
                <div className='absolute w-full '>
                    {users && Object.values(users).map((user) => (
                        <div className='flex items-center gap-4 rounded-xl p-3 mr-6 cursor-pointer hover:bg-greyish-400'>
                            <Avatar size='x-large' user={user} />
                            <div className='flex flex-col'>
                                <h5 className='text-Gray-50 text-lg font-Poppins font-semibold'>{user.displayName}</h5>
                                <p className='text-Gray-500'>{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PopupWrapper>
    );
};

export default UsersPopup;
