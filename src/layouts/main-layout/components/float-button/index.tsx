import { Button } from 'antd';
import React from 'react';
import { InboxIcon, LightningIcon, TaskIcon } from '../../../../icons';
import FloatItemButton from '../float-item-button';
import clsx from 'clsx';
import { ActiveType } from '../../types';
import { useFloatButtonStore } from '../../../../store';

const FloatButton: React.FC = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const { activeType, setActiveType } = useFloatButtonStore();

	const handleClickFloatItemButton = (type: ActiveType) =>
		setActiveType(type);

	const activeTypeSort = React.useMemo((): ActiveType[] => {
		if (activeType === 'inbox') return ['task', 'inbox'];
		if (activeType === 'task') return ['inbox', 'task'];
		return ['task', 'inbox'];
	}, [activeType]);

	return (
		<div
			className={clsx(
				activeType ? 'items-center' : 'items-end',
				'absolute right-[34px] bottom-[27px] flex justify-center gap-x-[26px]'
			)}
		>
			{isOpen && (
				<>
					{activeTypeSort.map((item, index) => (
						<FloatItemButton
							key={index}
							icon={
								item === 'task' ? (
									<TaskIcon isActive={activeType === item} />
								) : (
									<InboxIcon
										isActive={activeType === 'inbox'}
									/>
								)
							}
							buttonName={item === 'task' ? 'Task' : 'Inbox'}
							isActive={activeType === item}
							activeType={activeType}
							onClick={() => {
								if (activeType === item) {
									handleClickFloatItemButton(undefined);
									return;
								}

								handleClickFloatItemButton(item);
							}}
						/>
					))}
				</>
			)}
			{activeType === undefined && (
				<Button
					onClick={() => setIsOpen(!isOpen)}
					className="bg-[#2F80ED] w-[68px] h-[68px] rounded-full border-none shadow-[0px_4px_4px_0px_#0000001A]"
					icon={<LightningIcon />}
				/>
			)}
		</div>
	);
};

export default FloatButton;
