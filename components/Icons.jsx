import React from 'react';

const Icons = ({ size, icon, onClick, className }) => {
	//Constant of icon sizes utilizing tailwind css
	const c =
		size === 'small'
			? 'w-8 h-8'
			: size === 'medium'
			? 'w-9 h-9'
			: size === 'large'
			? 'w-10 h-10'
			: 'w-12 h-12';
	return (
		<div
			className={`${c} rounded-full flex items-center justify-center cursor-pointer ${className}`}
			onClick={onClick}>
			{icon && icon}
		</div>
	);
};

export default Icons;
