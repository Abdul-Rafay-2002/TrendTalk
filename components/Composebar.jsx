import React, { useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useChatContext } from '@/context/chatContext';
import {
	Timestamp,
	arrayUnion,
	doc,
	getDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { db, storage } from '@/firebase/firebase';
import { v4 as uuid } from 'uuid';
import { useAuth } from '@/context/authContext';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

let typingTimeout = null;

const Composebar = () => {
	const {
		inputText,
		setInputText,
		data,
		attachment,
		setAttachmentPreview,
		setAttachment,
		editMsg,
		setEditMsg,
	} = useChatContext();
	const { currentUser } = useAuth();
	const handleTyping = async (e) => {
		setInputText(e.target.value);
		await updateDoc(doc(db, 'chats', data.chatId), {
			[`typing . ${currentUser.uid}`]: true,
		});

    if(typingTimeout){
      clearInterval(typingTimeout);
    };
  
		typingTimeout = setTimeout(async () => {
			await updateDoc(doc(db, 'chats', data.chatId), {
				[`typing . ${currentUser.uid}`]: false,
			});
      typingTimeout = null
		}, 500);
	};

	const onKeyUp = (e) => {
		if (e.key === 'Enter' && (inputText || attachment)) {
			editMsg ? handleEdit() : handleSend();
		}
	};

	//Construct Messages details
	const handleSend = async () => {
		if (attachment) {
			// if file has uploading then this logic from FB
			const storageRef = ref(storage, uuid());
			const uploadTask = uploadBytesResumable(storageRef, attachment);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					console.error(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, 'chats', data.chatId), {
							messages: arrayUnion({
								id: uuid(),
								text: inputText,
								sender: currentUser.uid,
								date: Timestamp.now(),
								read: false,
								img: downloadURL,
							}),
						});
					});
				}
			);
		} else {
			await updateDoc(doc(db, 'chats', data.chatId), {
				messages: arrayUnion({
					id: uuid(),
					text: inputText,
					sender: currentUser.uid,
					date: Timestamp.now(),
					read: false,
				}),
			});
		}

		let msg = { text: inputText };
		if (attachment) {
			msg.img = true;
		}
		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: msg,
			[data.chatId + '.date']: serverTimestamp(),
		});

		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: msg,
			[data.chatId + '.date']: serverTimestamp(),
		});
		setInputText('');
		setAttachment(null);
		setAttachmentPreview(null);
	};

	const handleEdit = async () => {
		const messageId = editMsg.id;
		const chatRef = doc(db, 'chats', data.chatId);
		const chatDoc = await getDoc(chatRef);

		if (attachment) {
			// if file has uploading then this logic from FB
			const storageRef = ref(storage, uuid());
			const uploadTask = uploadBytesResumable(storageRef, attachment);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case 'paused':
							console.log('Upload is paused');
							break;
						case 'running':
							console.log('Upload is running');
							break;
					}
				},
				(error) => {
					// Handle unsuccessful uploads
					console.error(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						let updatedMessages = chatDoc?.data()?.messages?.map((message) => {
							if (message.id === messageId) {
								message.text = inputText;
								message.img = downloadURL;
							}
							return message;
						});
						await updateDoc(chatRef, {
							messages: updatedMessages,
						});
					});
				}
			);
		} else {
			let updatedMessages = chatDoc?.data()?.messages?.map((message) => {
				if (message.id === messageId) {
					message.text = inputText;
				}
				return message;
			});
			await updateDoc(chatRef, {
				messages: updatedMessages,
			});
		}
		setInputText('');
		setAttachment(null);
		setAttachmentPreview(null);
		setEditMsg(null);
	};

	useEffect(() => {
		setInputText(editMsg?.text || '');
	}, [editMsg]);

	return (
		<div className='flex items-center gap-2 grow'>
			<input
				type='text'
				placeholder='Type a Message'
				value={inputText}
				className='grow w-full h-full outline-none px-2 py-3 text-greyish-100/80 bg-greyish-300/5 placeholder:text-Gray-200/50 text-base'
				onChange={handleTyping}
				onKeyUp={onKeyUp}
			/>
			<button
				className={`h-10 w-10 rounded-full pl-1 shrink-0 flex justify-center items-center outline-none ${
					inputText.trim().length > 0 ? 'bg-greyish-600/80' : ''
				}`}
				onClick={editMsg ? handleEdit : handleSend}>
				<AiOutlineSend size={22} className='text-greyish-100/50' />
			</button>
		</div>
	);
};

export default Composebar;
