import React from 'react'
import ClickAwayListener from 'react-click-away-listener'

const ChatMenu = ({showMenu, setShowMenu}) => {
    const handleClickAway = () => {
        setShowMenu(false);
    }
    return (
        <ClickAwayListener onClickAway={handleClickAway} className=''>
            <div className='arrow'>
            <div className='w-[180px] absolute top-[55px] right-0 bg-greyish-500 rounded-md overflow-hidden z-20'>
                <ul className='p-2 flex flex-col text-greyish-100/80 '>
                    <li className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-greyish-400 hover:text-greyish-100 font-semibold'>Block User</li>

                </ul>
            </div>
            </div>
        </ClickAwayListener>
    )
}

export default ChatMenu