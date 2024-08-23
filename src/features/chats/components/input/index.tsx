import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';
import { useChatsStore } from '../../../../store/chats';
import { TChat, TChatItem, TChats, TInboxes } from '../../../../api/types';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { editChatByInboxId } from '../../../../api/chats';
import ChatReply from '../reply';
import clsx from 'clsx';
import { useInboxesStore } from '../../../../store';
import { updateInboxes } from '../../../../api/inboxes';
import { format, getUnixTime } from 'date-fns';

type ChatInputProps = {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TChats, Error>>;
};

const ChatInput: React.FC<ChatInputProps> = ({ refetch }) => {
	const [form] = Form.useForm();
	const { data, selectedId, setSelectedId } = useChatsStore();
	const { data: inboxes, selectedInboxesId } = useInboxesStore();
	const { mutateAsync, isPending } = useMutation({
		mutationFn: (payload: any) =>
			editChatByInboxId(payload.id, payload.body),
	});
	const { mutateAsync: updateInbox } = useMutation({
		mutationFn: (payload: any) => updateInboxes(payload.id, payload.body),
	});

	const handleFinish: FormProps['onFinish'] = async (values) => {
		if (!values) return;
		if (!data) return;
		const message = values.message.trim();
		if (!message) return;
		const date = getUnixTime(format(new Date(), 'yyyy-MM-dd'));
		const keys = Object.keys(data?.chats || {});

		if (keys.some((item) => item === date.toString())) {
			const newDataChats = [...(data?.chats[date] || [])];

			const newChat: TChatItem = {
				id: `${date}-${newDataChats.length + 1}`,
				replyId: selectedId || '',
				chat: message,
				sender: 'You',
				time: Date.now() / 1000,
			};

			newDataChats.push(newChat);

			const newChats: TChats = {
				...data,
				lastUnReadChatId: '',
				chats: {
					...data.chats,
					[date]: newDataChats,
				},
			};

			await mutateAsync({
				id: data.id,
				body: newChats,
			});

			await refetch();

			if (!inboxes) return;

			const findInbox = inboxes.find((i) => i.id === selectedInboxesId);

			if (!findInbox) return;

			const newInboxes: TInboxes = {
				...findInbox,
				lastSender: newChat.sender,
				lastChat: newChat.chat,
				lastChatTime: newChat.time,
				isRead: true,
			};

			await updateInbox({
				id: newInboxes.id,
				body: newInboxes,
			});
		} else {
			const newChat: TChatItem = {
				id: `${date}-1`,
				replyId: selectedId || '',
				chat: message,
				sender: 'You',
				time: Date.now() / 1000,
			};

			let newDataChats: TChat = {
				...(data?.chats || {}),
				[date]: [newChat],
			};

			const newChats: TChats = {
				...data,
				lastUnReadChatId: '',
				chats: newDataChats,
			};

			await mutateAsync({
				id: data.id,
				body: newChats,
			});

			await refetch();

			if (!inboxes) return;

			const findInbox = inboxes.find((i) => i.id === selectedInboxesId);

			if (!findInbox) return;

			const newInboxes: TInboxes = {
				...findInbox,
				lastSender: newChat.sender,
				lastChat: newChat.chat,
				lastChatTime: newChat.time,
				isRead: true,
			};

			await updateInbox({
				id: newInboxes.id,
				body: newInboxes,
			});
		}

		form.resetFields();
		setSelectedId(null);
	};

	return (
		<div className="pl-[29px] pr-[11px]">
			{selectedId && <ChatReply />}
			<Form
				onFinish={handleFinish}
				form={form}
			>
				<div className="flex items-center gap-x-2">
					<Form.Item
						noStyle
						name="message"
					>
						<Input.TextArea
							className={clsx(
								selectedId && 'rounded-t-none',
								'h-[40px] border-[1px] border-[#828282] placeholder:text-[#333]'
							)}
							placeholder="Type a new message"
							onKeyDown={(e) => {
								if (e.code === 'Enter' && e.shiftKey == false) {
									e.preventDefault();
									handleFinish(form.getFieldsValue());
								}
							}}
						/>
					</Form.Item>

					<Button
						htmlType="submit"
						loading={isPending}
						className="bg-[#2F80ED] text-white text-[14px] w-[76px] h-[40px]"
					>
						Send
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default ChatInput;
