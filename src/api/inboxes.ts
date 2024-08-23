import fetchApi from '.';
import { useInboxesStore } from '../store';

export const getAllInboxes = () =>
	fetchApi({
		path: '/inboxes',
		method: 'GET',
	}).then((res) =>
		res.json().then((resJson) => {
			useInboxesStore.getState().setData(resJson);
			return resJson;
		})
	);

export const updateInboxes = (inboxesId: string, body: any) =>
	fetchApi({
		path: `/inboxes/${inboxesId}`,
		method: 'PUT',
		body,
	}).then((res) => res.json());
