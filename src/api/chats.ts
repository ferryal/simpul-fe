import fetchApi from '.';
import { useChatsStore } from '../store/chats';

export const getChatByInboxId = (inboxId?: string) =>
	fetchApi({
		path: `/chats/${inboxId}`,
		method: 'GET',
	}).then((res) =>
		res.json().then((resJson) => {
			useChatsStore.getState().setData(resJson);
			return resJson;
		})
	);

export const editChatByInboxId = (inboxId: string, body: any) =>
	fetchApi({
		path: `/chats/${inboxId}`,
		method: 'PUT',
		body,
	}).then((res) => res.json());
