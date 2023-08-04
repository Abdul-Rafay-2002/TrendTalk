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
                        <div className='flex items-center gap-4 rounded-xl py-2 px-4 cursor-pointer'>
                            <Avatar size='x-large' user={user}/>  
                            <h5 className='text-greyish-200 text-lg font-Roboto font-semibold'>{user.displayName}</h5>  
                        </div>
                    ))}
                </div>
            </div>
        </PopupWrapper>
    );
};

export default UsersPopup;
