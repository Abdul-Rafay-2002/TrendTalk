import React from 'react';
import PopupWrapper from './PopupWrapper';
import { useAuth } from '@/context/authContext';
import { useChatContext } from '@/context/chatContext';
import { RiErrorWarningLine } from 'react-icons/ri';
import { DELETED_FOR_EVERYONE, DELETED_FOR_ME } from '@/utils/constants';

const DeleteMessagePopup = (props) => {
    const { currentUser } = useAuth();
    const { users, dispatch } = useChatContext();

    return (
        <PopupWrapper {...props}>
            <div className='m-5'>
                <div className='flex flex-col items-center justify-center gap-3'>
                    <RiErrorWarningLine
                        size={40}
                        className=' bg-greyish-300/50 text-Red-100 p-1 rounded-full'
                    />
                    <div className='font-Poppins'>
                        Are you sure, you want to delete this message?
                    </div>
                </div>
                <div className='flex items-center justify-center gap-3 mt-5 mb-5'>

                    <button
                        className='border-2 border-Red-200 py-2 text-sm rounded-md px-4 text-Red-200 font-semibold hover:text-greyish-100 hover:bg-Red-100'
                        onClick={() => props.deleteMessage(DELETED_FOR_ME)}>
                        Delete for me
                    </button>

                    {props.self && (<button
                        className='border-2 border-Red-200 py-2 text-sm rounded-md px-4 text-Red-200 font-semibold hover:text-greyish-100 hover:bg-Red-100'
                        onClick={() => [props.deleteMessage(DELETED_FOR_EVERYONE)]}>
                        Delete for everyone
                    </button>
                    )}
                    <button
                        className='border-2 border-Red-200 py-2 text-sm rounded-md px-4 hover:text-Red-200 font-semibold hover:bg-greyish-100 text-greyish-100 hover:border-greyish-100 bg-Red-100'
                        onClick={props.onHide}>
                        Cancel
                    </button>
                </div>
            </div>
        </PopupWrapper>
    );
};

export default DeleteMessagePopup;
