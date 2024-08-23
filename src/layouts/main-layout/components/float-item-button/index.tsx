import { Button } from 'antd';
import clsx from 'clsx';
import React from 'react';
import { ActiveType } from '../../types';

type FloatItemButtonProps = {
	buttonName: string;
	icon: React.ReactNode;
	isActive: boolean;
	activeType: ActiveType;
	onClick: React.MouseEventHandler<HTMLElement>;
};

const FloatItemButton: React.FC<FloatItemButtonProps> = ({
	buttonName,
	icon,
	isActive,
	activeType,
	onClick,
}) => {
	return (
		<>
			<div className="flex-col text-center">
				{!activeType && (
					<div className="text-[#F2F2F2] mb-[13.87px] lato-regular">
						{buttonName}
					</div>
				)}
				<Button
					onClick={onClick}
					className={clsx(
						isActive && activeType === 'task'
							? 'bg-[#F8B76B]'
							: isActive && activeType === 'inbox'
							? 'bg-[#8785FF]'
							: 'bg-[#F2F2F2]',
						isActive ? 'w-[68px] h-[68px]' : 'w-[60px] h-[60px]',
						'z-10 rounded-full border-none hover:border-none shadow-[0px_4px_4px_0px_#0000001A]'
					)}
					icon={icon}
				/>
			</div>
			{activeType !== undefined && (
				<div className="absolute z-0 right-[15px] bg-[#4F4F4F] w-[68px] h-[68px] rounded-full"></div>
			)}
		</>
	);
};

export default FloatItemButton;
