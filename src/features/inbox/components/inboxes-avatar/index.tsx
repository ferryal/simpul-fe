import React from 'react';
import { PersonIcon } from '../../../../icons';

type InboxesAvatarProps = {
	isGroup: boolean;
	initial: string;
};

const InboxesAvatar: React.FC<InboxesAvatarProps> = ({ isGroup, initial }) => {
	return (
		<div className="flex">
			{isGroup ? (
				<>
					<div className="z-1 bg-[#E0E0E0] rounded-full w-[34px] h-[34px] flex justify-center items-center">
						<PersonIcon />
					</div>
					<div className="z-10 relative left-[-17px] bg-[#2F80ED] rounded-full w-[34px] h-[34px] flex justify-center items-center">
						<PersonIcon isWhite />
					</div>
				</>
			) : (
				<div className="bg-[#2F80ED] relative left-[8px] mr-[32px] rounded-full w-[34px] h-[34px] flex justify-center items-center text-white lato-bold">
					{initial}
				</div>
			)}
		</div>
	);
};

export default InboxesAvatar;
