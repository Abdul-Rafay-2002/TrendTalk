import React, { useEffect, useRef } from 'react';
import ClickAwayListener from 'react-click-away-listener';

const MessageMenu = ({ showMenu, setShowMenu, self }) => {
	const handleClickAway = () => {
		setShowMenu(false);
	};
	const ref = useRef();
	useEffect(() => {
		ref?.current?.scrollIntoViewIfNeeded(); 
	}, [showMenu]);

	return (
		<ClickAwayListener onClickAway={handleClickAway}>
			<div>
				<div
					ref={ref}
					className={`w-[150px] absolute bg-Gray-800 rounded-md overflow-hidden z-10 top-8 ${
						self ? 'right-0' : 'left-0'
					}`}>
					<ul className='p-2 flex flex-col text-greyish-100/80 '>
						{self && (
							<li className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-blue-500 hover:text-greyish-100 font-semibold'>
								Edit Message
							</li>
						)}
						<li className='flex items-center py-2 px-3 cursor-pointer text-sm rounded-md hover:bg-blue-500 hover:text-greyish-100 font-semibold'>
							Delete Message{' '}
						</li>
					</ul>
				</div>
			</div>
		</ClickAwayListener>
	);
};

export default MessageMenu;
