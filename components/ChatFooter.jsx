import React, { useState } from 'react';
import Icons from './Icons';
import { CgAttachment } from 'react-icons/cg';
import { HiOutlineEmojiHappy } from 'react-icons/hi';
import EmojiPicker from 'emoji-picker-react';
import ClickAwayListener from 'react-click-away-listener';
import Composebar from './Composebar';
import { IoClose } from 'react-icons/io5';
import { useChatContext } from '@/context/chatContext';

const ChatFooter = () => {
	const handleClickAway = () => {
		setUseEmojiPicker(false);
	};
	const [useEmojiPicker, setUseEmojiPicker] = useState(false);
	const {
		isTyping,
		editMsg,
		setEditMsg,
		inputText,
		setInputText,
		setAttachment,
		attachmentPreview,
		setAttachmentPreview,
	} = useChatContext();
	const onEmojiClick = (emojiData) => {
		let text = inputText;
		setInputText((text += emojiData.emoji));
	};
	const onFileChange = (e) => {
		const file = e.target.files[0];
		setAttachment(file);

		if (file) {
			const blobUrl = URL.createObjectURL(file);
			setAttachmentPreview(blobUrl);
		}
	};
	return (
		<div className=' flex items-center bg-greyish-300/50 rounded-xl p-2 relative border border-greyish-200/20'>
			{attachmentPreview && (
				<div className='absolute w-[120px] h-[120px] bottom-[4.6rem] left-0 bg-greyish-400/50 p-2 rounded-md '>
					<img src={attachmentPreview} className='object-cover w-full h-full' />
					<div
						className='w-5 h-5 rounded-full bg-Red-100 flex justify-center items-center absolute -right-2 -top-2 cursor-pointer hover:bg-Red-200'
						onClick={() => {
							setAttachment(null);
							setAttachmentPreview(null);
						}}>
						<IoClose size={14} color='#fff' />
					</div>
				</div>
			)}
			<div className='shrink-0'>
				<input
					type='file'
					id='fileUploader'
					className='hidden'
					onChange={onFileChange}
				/>
				<label htmlFor='fileUploader'>
					<Icons
						size='large'
						icon={
							<CgAttachment
								size={20}
								className='w-9 h-9 rounded-full p-2 text-Gray-200/50 hover:bg-greyish-600/80 '
							/>
						}
					/>
				</label>
			</div>
			<div className='shrink-0 relative'>
				<Icons
					size='large'
					icon={
						<HiOutlineEmojiHappy
							size={25}
							className='w-9 h-9 rounded-full p-[6px] text-Gray-200/50 hover:bg-greyish-600/80 '
						/>
					}
					onClick={() => setUseEmojiPicker(true)}
				/>
				{useEmojiPicker && (
					<ClickAwayListener onClickAway={handleClickAway}>
						<div className='absolute bottom-12 left-0 shadow-lg'>
							<EmojiPicker
								emojiStyle='apple'
								theme='dark'
								onEmojiClick={onEmojiClick}
								autoFocusSearch={false}
								width={350}
							/>
						</div>
					</ClickAwayListener>
				)}
			</div>
			{isTyping && (
				<div className='absolute -top-6 left-4 bg-greyish-600 w-full h-6'>
					<div className='flex gap-2 w-full h-full opacity-50 text-sm text-greyish-100'>
						{`User is Typing`}
						<img src='/typing.svg' className='text' />
					</div>
				</div>
			)}
			{editMsg && (
				<div
					className='absolute -top-12 left-1/2 shadow-Red-100/50 -translate-x-1/2 bg-Red-100 text-greyish-100 flex items-center gap-2 py-2 px-4 pr-2 rounded-full  font-semibold cursor-pointer shadow-lg hover:bg-Red-200'
					onClick={() => setEditMsg(null)}>
					<span className='text-sm'>Cancel Edit</span>
					<IoClose size={16} color='text-greyish-100 ' />
				</div>
			)}
			<Composebar />
		</div>
	);
};

export default ChatFooter;
