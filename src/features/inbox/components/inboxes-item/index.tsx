import React from 'react';
import InboxesAvatar from '../inboxes-avatar';
import { Badge } from 'antd';
import { format } from 'date-fns';
import { useInboxesStore } from '../../../../store';
import { TInboxes } from '../../../../api/types';

type InboxesItemProps = {
	data: TInboxes;
	isLastItem?: boolean;
};

const InboxesItem: React.FC<InboxesItemProps> = ({ data, isLastItem }) => {
	const { setSelectedInboxesId } = useInboxesStore();

	const handleClickInbox = () => setSelectedInboxesId(data.id);

	return (
		<div>
			<div className="py-[22px] flex items-start">
				<InboxesAvatar
					isGroup={data.isGroup}
					initial={data.name.charAt(0)}
				/>

				<div className="flex-col w-full">
					<div className="flex items-start gap-x-4 mb-2">
						<div
							className="lato-bold font-[16px] text-[#2F80ED] max-w-[414.73px] cursor-pointer"
							onClick={handleClickInbox}
						>
							{data.name}
						</div>
						<div className="text-[#4F4F4F]">
							{format(
								new Date(data.lastChatTime * 1000),
								'dd/MM/yyyy HH:mm'
							)}
						</div>
					</div>

					{data.isGroup && (
						<div className="text-[#4F4F4F] lato-bold font-[14px] mb-1">
							{data.lastSender} :
						</div>
					)}

					<div className="flex justify-between w-full">
						<div className="max-w-[460px] truncate text-[#4F4F4F]">
							{data.lastChat}
						</div>
						{!data.isRead && <Badge color="#EB5757" />}
					</div>
				</div>
			</div>

			{!isLastItem && <hr className="border-[1px_solid_#828282]" />}
		</div>
	);
};

export default InboxesItem;
