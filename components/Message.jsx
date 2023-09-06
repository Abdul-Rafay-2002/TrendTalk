import { useAuth } from '@/context/authContext';
import React, { useState } from 'react';
import Avatar from './Avatar';
import { useChatContext } from '@/context/chatContext';
import Image from 'next/image';
import ImageViewer from 'react-simple-image-viewer';
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { formatDate, wrapEmojisInHtmlTag } from '@/utils/helpers';
import Icons from './Icons';
import { GoChevronDown } from 'react-icons/go';
import MessageMenu from './MessageMenu';
import DeleteMessagePopup from './popup/DeleteMessagePopup';
import { db } from '@/firebase/firebase';
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from '@/utils/constants';

const Message = ({ message }) => {
    const { currentUser } = useAuth();
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const { users, data, imageViewer, setImageViewer, setEditMsg } = useChatContext();
    const [showMenu, setShowMenu] = useState(false);
    const self = message.sender === currentUser.uid;
    const timestamp = new Timestamp(
        message.date?.seconds,
        message.date?.nanoseconds
    );
    const date = timestamp.toDate();

    const deletePopupHandler = () => {
        setShowDeletePopup(true);
        setShowMenu(false);
    };
    const deleteMessage = async (action) => {
        try {
            const messageId = message.id;
            const chatRef = doc(db, 'chats', data.chatId);
            const chatDoc = await getDoc(chatRef);
            const updatedMessages = chatDoc.data().messages.map((message) => {
                if (message.id === messageId) {
                    if (action === DELETED_FOR_ME) {
                        message.deletedInfo = {
                            [currentUser.uid]: DELETED_FOR_ME,
                        };
                    }
                    if (action === DELETED_FOR_EVERYONE) {
                        message.deletedInfo = {
                            deletedForEveryone: true,
                        };
                    }
                }
                return message;
            });

            await updateDoc(chatRef, {
                messages: updatedMessages,
            });
            setShowDeletePopup(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`mb-5 mx-w-[75%] ${self ? 'self-end' : ''}`}>
            {showDeletePopup && (
                <DeleteMessagePopup
                    noHeader={true}
                    shortHeight={true}
                    self={self}
                    deleteMessage={deleteMessage}
                    onHide={() => {
                        setShowDeletePopup(false);
                    }}
                    className='DeleteMessagePopup'
                />
            )}
            <div
                className={`flex items-end gap-3 mb-1 ${self ? 'justify-start flex-row-reverse' : ''
                    }`}>
                <Avatar
                    size='small'
                    user={self ? currentUser : users[data.user.uid]}
                    className='mb-4'
                />
                <div
                    className={`group flex flex-col gap-4 p-4 rounded-3xl relative ${self
                        ? 'rounded-br-md bg-greyish-500/80'
                        : 'rounded-bl-md bg-greyish-400/80'
                        }`}>
                    {message.text && (
                        <div className='text-sm text-greyish-100 Jost'>{message.text}</div>
                    )}
                    {message.img && (
                        <>
                            <Image
                                src={message.img}
                                width={250}
                                height={250}
                                alt={message?.text || ''}
                                className='rounded-3xl max-w-[200px] max-h-[200px] object-cover'
                                onClick={() => {
                                    setImageViewer({
                                        msgId: message.id,
                                        url: message.img,
                                    });
                                }}
                            />
                            {imageViewer && imageViewer.msgId === message.id && (
                                <ImageViewer
                                    src={[imageViewer.url]}
                                    currentIndex={0}
                                    disableScroll={false}
                                    closeOnClickOutside={true}
                                    onClose={() => setImageViewer(null)}
                                />
                            )}
                        </>
                    )}
                    <div
                        className={`${showMenu ? '' : 'hidden'
                            } group-hover:flex absolute top-0 bottom-0 rounded-full w-8 h-8 m-auto ${self ? '-left-0 bg-Gray-800 ' : ' -right-0 bg-greyish-600/80'
                            }`}>
                        <Icons
                            size='small'
                            className='hover:bg-inherit'
                            icon={<GoChevronDown size={20} className='text-greyish-200' />}
                            onClick={() => {
                                setShowMenu(true);
                            }}
                        />
                        {showMenu && (
                            <MessageMenu
                                self={self}
                                setShowMenu={setShowMenu}
                                showMenu={showMenu}
                                deletePopupHandler={deletePopupHandler}
                                setEditMsg={() => setEditMsg(message)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div
                className={`flex items-end ${self ? 'justify-start flex-row-reverse mr-12' : 'ml-12'
                    }`}>
                <div className='text-xs text-greyish-200/40'>{formatDate(date)}</div>
            </div>
        </div>
    );
};

export default Message;
