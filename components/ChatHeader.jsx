import { useChatContext } from '@/context/chatContext';
import React, { useState } from 'react';
import Avatar from './Avatar';
import Icons from './Icons';
import { IoEllipsisVerticalSharp } from 'react-icons/io5';
import ChatMenu from './ChatMenu';

const ChatHeader = () => {
    const [showMenu, setShowMenu] = useState(false);
    const { data, users } = useChatContext();
    const online = users[data.user.uid]?.isOnline;
    const user = users[data.user.uid];
    return (
        <div className='flex justify-between items-center pb-5 border-b border-greyish-100/25'>
            {
                user &&
                <div className='flex items-center gap-3'>
                    <Avatar size='large' user={user} />
                    <div>
                        <h6 className='text-greyish-100 font-Poppins text-sm'>{user?.displayName}</h6>
                        <p className='text-greyish-100/60 font-light text-xs tracking-widest '>{online ? 'Online' : "Offline"}</p>
                    </div>
                </div>
            }
            <div className='flex items-center relative '>
                <Icons size='large' className={`${showMenu ? 'bg-greyish-500' : ''}`} onClick={() => setShowMenu(true)} icon={<IoEllipsisVerticalSharp size={20} className='text-greyish-200/50' />} />
                {showMenu && <ChatMenu setShowMenu={setShowMenu} showMenu={showMenu} />}
            </div>
        </div>
    );
};

export default ChatHeader;
