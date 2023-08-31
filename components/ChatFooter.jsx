import React, { useState } from 'react';
import Icons from './Icons';
import { CgAttachment } from 'react-icons/cg';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import Composebar from './Composebar';
import EmojiPicker from 'emoji-picker-react';
import ClickAwayListener from 'react-click-away-listener';

const ChatFooter = () => {
	const handleClickAway = () => {
		setUseEmojiPicker(false);
	};
	const [useEmojiPicker, setUseEmojiPicker] = useState(false);
	const onEmojiClick = () => {};

	return (
		<div className=' flex items-center bg-greyish-300 rounded-xl p-2 relative'>
			<div className='shrink-0'>
				<input type='file' id='fileUploader' className='hidden' onChange={''} />
				<label htmlFor='fileUploader'>
					<Icons
						size='large'
						icon={<CgAttachment size={20} className='text-greyish-600/80' />}
					/>
				</label>
			</div>
			<div className='shrink-0 relative'>
				<Icons
					size='large'
					icon={
						<HiOutlineEmojiHappy size={25} className='text-greyish-600/80' />
					}
					onClick={() => setUseEmojiPicker(true)}
				/>
				{useEmojiPicker && (
					<ClickAwayListener onClickAway={handleClickAway}>
						<div className='absolute bottom-12 left-0 shadow-lg'>
							<EmojiPicker
								emojiStyle='native'
								theme='light'
								onEmojiClick={onEmojiClick}
								autoFocusSearch={false}
								width={350}
							/>
						</div>
					</ClickAwayListener>
				)}
			</div>
		</div>
	);
};

export default ChatFooter;
