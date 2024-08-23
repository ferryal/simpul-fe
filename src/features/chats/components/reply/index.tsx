import React from 'react';
import { useChatsStore } from '../../../../store';
import { CloseIcon } from '../../../../icons';

const ChatReply: React.FC = () => {
	const { selectedId, data, setSelectedId } = useChatsStore();
	const splittedId = (selectedId || '')?.split('-');
	const chat = data?.chats[splittedId[0]].find(
		(item) => item.id === selectedId
	);

	const handleCloseReply = () => setSelectedId(null);

	return chat ? (
		<div className="absolute bottom-9 w-[615px]">
			<div className="bg-[#F2F2F2] px-[15px] py-[20px] border-solid border-[1px] border-[#828282] rounded-t-md">
				<div className="flex justify-between items-start">
					<div className="text-[#4F4F4F] lato-bold">
						Replying to {chat.sender}
					</div>
					<div
						className="cursor-pointer"
						onClick={handleCloseReply}
					>
						<CloseIcon />
					</div>
				</div>
				<div className="text-[#4F4F4F]">{chat.chat}</div>
			</div>
		</div>
	) : null;
};

export default ChatReply;
