import React from 'react';
import { AiOutlineSend } from 'react-icons/ai'
import { useChatContext } from '@/context/chatContext';

const Composebar = () => {
  const { inputText, setInputText } = useChatContext();
  const handleTyping = (e) => {
    setInputText(e.target.value);
  };
  const onKeyUp = () => { };
  return (
    <div className='flex items-center gap-2 grow'>
      <input
        type='text'
        placeholder='Type a Message'
        value={inputText}
        className='grow w-full h-full outline-none px-2 py-3 text-greyish-100/80 bg-greyish-300 placeholder:text-Gray-200/50 text-base'
        onChange={handleTyping}
        onKeyUp={onKeyUp}
      />
      <button className={`h-10 w-10 rounded-full pl-1 shrink-0 flex justify-center items-center outline-none ${inputText.trim().length > 0 ? 'bg-greyish-600/80' : ''}`}>
        <AiOutlineSend size={22} className='text-Gray-200/50' />
      </button>
    </div>
  );
};

export default Composebar;
