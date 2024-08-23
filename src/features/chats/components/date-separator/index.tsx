import { format } from 'date-fns';
import React from 'react';

type ChatDateSeparatorProps = {
	date: string;
};

const ChatDateSeparator: React.FC<ChatDateSeparatorProps> = ({ date }) => {
	return (
		<div className="flex justify-center items-center">
			<hr className="h-0 w-full border-[1px_solid_#4F4F4F]" />
			<div className="text-[#4F4F4F] lato-bold font-[14px] w-[50%] text-center">
				{format(parseInt(date) * 1000, 'MMMM dd, yyyy')}
			</div>
			<hr className="h-0 w-full border-[1px_solid_#4F4F4F]" />
		</div>
	);
};

export default ChatDateSeparator;
