import React from 'react';
import { TChatItem, TChats, TInboxes } from '../../../../api/types';
import clsx from 'clsx';
import { format } from 'date-fns';
import NewMessageSeparator from '../new-message-separator';
import { MoreIcon } from '../../../../icons';
import { Dropdown, MenuProps } from 'antd';
import { useChatsStore, useInboxesStore } from '../../../../store';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { editChatByInboxId } from '../../../../api/chats';
import { updateInboxes } from '../../../../api/inboxes';

type ChatBubbleProps = {
	data: TChatItem;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TChats, Error>>;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({ data, refetch }) => {
	const { setSelectedId, data: datas } = useChatsStore();
	const { data: inboxes, selectedInboxesId } = useInboxesStore();
	const handleReply = () => setSelectedId(data.id);
	const { mutateAsync: deleteChat } = useMutation({
		mutationFn: (payload: any) =>
			editChatByInboxId(payload.id, payload.body),
	});
	const { mutateAsync: updateInbox } = useMutation({
		mutationFn: (payload: any) => updateInboxes(payload.id, payload.body),
	});

	const handleDeleteChat = async () => {
		if (!datas) return;
		let newDatas = { ...datas };
		const chatKey = data.id.split('-')[0];
		const findIndex = newDatas.chats[chatKey].findIndex(
			(item) => item.id === data.id
		);

		if (findIndex !== -1) newDatas.chats[chatKey].splice(findIndex, 1);

		await deleteChat({
			id: datas?.id,
			body: newDatas,
		});
		await refetch();

		if (!inboxes) return;

		const findInbox = inboxes.find((i) => i.id === selectedInboxesId);

		if (!findInbox) return;

		const keys = Object.keys(newDatas.chats);
		let lastKeyIndex = keys.length - 1;
		let lastChat: TChatItem | undefined = undefined;

		while (lastKeyIndex >= 0) {
			if (newDatas.chats[keys[lastKeyIndex]].length > 0) {
				const lastIndex = newDatas.chats[keys[lastKeyIndex]].length - 1;
				lastChat = newDatas.chats[keys[lastKeyIndex]][lastIndex];
				break;
			}
			lastKeyIndex--;
		}

		if (!lastChat) return;

		const newInbox: TInboxes = {
			...findInbox,
			isRead: true,
			lastChat: lastChat.chat,
			lastChatTime: lastChat.time,
			lastSender: lastChat.sender,
		};

		await updateInbox({
			id: selectedInboxesId,
			body: newInbox,
		});
	};

	const DROPDOWN_ITEMS = (): MenuProps['items'] => {
		if (data.sender !== 'You')
			return [
				{
					key: 'share',
					label: <div className="text-[#2F80ED]">Share</div>,
				},
				{
					key: 'reply',
					label: <div className="text-[#2F80ED]">Reply</div>,
					onClick: handleReply,
				},
			];

		return [
			{
				key: 'edit',
				label: <div className="text-[#2F80ED]">Edit</div>,
			},
			{
				key: 'delete',
				label: <div className="text-[#EB5757]">Delete</div>,
				onClick: handleDeleteChat,
			},
		];
	};

	return (
		<>
			{datas?.lastUnReadChatId === data.id && <NewMessageSeparator />}
			<div className="m-[10px]">
				<div
					style={{
						color: data?.senderColor
							? data?.senderColor
							: data.sender === 'You'
							? '#9B51E0'
							: '#2F80ED',
					}}
					className={clsx(
						data.sender === 'You' ? 'justify-end' : 'justify-start',
						'flex lato-regular text-[14px] mb-[8.89px]'
					)}
				>
					{data.sender}
				</div>

				{data.replyId && datas && (
					<div
						className={clsx(
							data.sender === 'You'
								? 'justify-end'
								: 'justify-start',
							'flex mb-2'
						)}
					>
						<div className="max-w-[515px] bg-[#F2F2F2] border-solid border-[1px] border-[#E0E0E0] rounded-[5px] text-[#4F4F4F] p-[10px]">
							{datas?.chats[data.replyId.split('-')[0]]?.find(
								(item) => item.id === data.replyId
							)?.chat || <i>No Message Available</i>}
						</div>
					</div>
				)}

				<div
					className={clsx(
						'flex',
						data.sender === 'You' ? 'justify-end' : 'justify-start'
					)}
				>
					<div
						className={clsx(
							'flex items-start gap-x-2',
							data.sender === 'You'
								? 'flex-row-reverse'
								: 'flex-row'
						)}
					>
						<div
							style={{
								backgroundColor: data?.bubbleColor
									? data.bubbleColor
									: data.sender === 'You'
									? '#EEDCFF'
									: '#F8F8F8',
							}}
							className="flex-col max-w-[518px] text-[#4F4F4F] p-[10px] rounded-[5px]"
						>
							<div className="mb-2">{data.chat}</div>
							<div className="text-[12px]">
								{format(data.time * 1000, 'HH:mm')}
							</div>
						</div>

						<Dropdown
							menu={{ items: DROPDOWN_ITEMS() }}
							trigger={['click']}
						>
							<a onClick={(e) => e.preventDefault()}>
								<MoreIcon />
							</a>
						</Dropdown>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChatBubble;
