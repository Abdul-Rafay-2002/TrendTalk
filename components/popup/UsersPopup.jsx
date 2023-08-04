import React from 'react';
import PopupWrapper from './PopupWrapper';
import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import Avatar from '../Avatar';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/firebase';

const UsersPopup = (props) => {
    const { currentUser } = useAuth();
    const { users, dispatch } = useChatContext();

    const handleSelect = async (user) => {
        try {
            const combinedId =
                currentUser.uid > user.uid
                    ? currentUser.uid + user.uid
                    : user.uid + currentUser.uid;

            const res = await getDoc(doc(db, 'chats', combinedId));

            if (!res.exists()) {
                // Chat Document doesn't Exsist
                await setDoc(doc(db, 'chats', combinedId), { message: [] });
                const currentUserChatRef = await getDoc(
                    doc(db, 'userChats', currentUser.uid)
                );
                const UserChatRef = await getDoc(doc(db, 'userChats', user.uid));
                if (!currentUserChatRef.exists()) {
                    // Create new chat document for current user
                    await setDoc(doc(db, 'userChats', currentUser.uid), {});
                }
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL || null,
                        color: user.color
                    },
                    [combinedId + ".data"]: serverTimestamp()
                });
                if (!UserChatRef.exists()) {
                    // Create new chat document for user
                    await setDoc(doc(db, 'userChats', user.uid), {});
                }
                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL || null,
                        color: currentUser.color
                    },
                    [combinedId + ".data"]: serverTimestamp(),
                });
            }
            else {
                // Chat Document Exsist
            }

            dispatch({ type: 'CHANGE_USER', payload: user })
            props.onHide();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <PopupWrapper {...props}>
            <div className='mt-5 flex flex-col grow gap-2 relative overflow-auto scrollbar'>
                <div className='absolute w-full '>
                    {users &&
                        Object.values(users).map((user) => (
                            <div
                                key={user.uid}
                                className='flex items-center gap-4 rounded-xl p-3 mr-6 cursor-pointer hover:bg-greyish-400'
                                onClick={() => handleSelect(user)}>
                                <Avatar size='x-large' user={user} />
                                <div className='flex flex-col'>
                                    <h5 className='text-Gray-50 text-lg font-Poppins font-semibold'>
                                        {user.displayName}
                                    </h5>
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
