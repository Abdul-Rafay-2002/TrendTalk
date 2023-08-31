import Image from 'next/image';
import React from 'react';

const Avatar = ({ size, user, onClick }) => {
  //Constants for Avatar Sizes
  const s =
    size === 'small'
      ? 32
      : size === 'medium'
        ? 36
        : size === 'x-large'
          ? 56
          : size === 'xx-large'
            ? 96
            : 40;

  //Constants for Avatar Sizes with initializing Tailwind class
  const c =
    size === 'small'
      ? 'w-8 h-8'
      : size === 'medium'
        ? 'w-9 h-9'
        : size === 'large'
          ? 'w-10 h-10'
          : size === 'x-large'
            ? 'w-14 h-14'
            : 'w-24 h-24';

  //Constants for Avatar font Size with initializing Tailwind class
  const f =
    size === 'x-large'
      ? 'text-2xl'
      : size === 'xx-large'
        ? 'text-4xl'
        : 'text-base';

  return (
    <div
      className={`${c} rounded-full flex items-center justify-center text-base shrink-0 relative`}
      style={{
        backgroundColor: user?.color,
      }}
      onClick={onClick}>
      {user?.isOnline && (
        <>
          {size === 'large' && (
            <span className='w-[14px] h-[14px] rounded-full border-[3px] z-30 border-Gray-800 bg-limegreen-100 absolute top-[0px] right-[0px]'></span>
          )}
          {size === 'x-large' && (
            <span className='w-[18px] h-[18px] rounded-full border-[4px] z-30 border-Gray-800 bg-limegreen-100 absolute top-[0px] right-[0px]'></span>
          )}
          {size === 'xx-large' && (
            <span className='w-[22px] h-[22px] rounded-full border-[5px] z-30 border-Gray-800 bg-limegreen-100 absolute top-[0px] right-[0px]'></span>
          )}
        </>
      )}
      {user?.photoURL ? (
        <div>
          <Image
            className={`${c} overflow-hidden rounded-full object-cover`}
            src={user?.photoURL}
            alt='User Profile'
            width={s}
            height={s}
          />
        </div>
      ) : (
        <div
          className={`uppercase text-Gray-100 font-Poppins font-semibold ${f}`}>
          {user?.displayName?.charAt(0)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
