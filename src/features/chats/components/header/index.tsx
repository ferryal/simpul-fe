import React from 'react';
import { BackIcon, CloseIcon } from '../../../../icons';
import { useFloatButtonStore, useInboxesStore } from '../../../../store';

type ChatHeaderProps = {
	name?: string;
	isGroup?: boolean;
	totalParticipants?: number;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({
	isGroup,
	name,
	totalParticipants,
}) => {
	const { setSelectedInboxesId } = useInboxesStore();
	const { setActiveType } = useFloatButtonStore();

	const handleBack = () => setSelectedInboxesId(undefined);
	const handleClose = () => {
		handleBack();
		setActiveType(undefined);
	};

	return (
		<>
			<div className="pt-[24px] px-[32px] flex justify-between items-center w-full mb-[18.44px]">
				<div className="flex items-center gap-x-[14.43px]">
					<div
						onClick={handleBack}
						className="cursor-pointer"
					>
						<BackIcon />
					</div>

					<div className="flex-col ">
						<div className="text-[#2F80ED] lato-bold font-[16px] ">
							{name}
						</div>

						{isGroup && (
							<div className="mt-[9.36px] text-[#333333]">
								{totalParticipants} participants
							</div>
						)}
					</div>
				</div>

				<div
					className="cursor-pointer"
					onClick={handleClose}
				>
					<CloseIcon />
				</div>
			</div>

			<hr className="border-[1px_solid_#BDBDBD]" />
		</>
	);
};

export default ChatHeader;
