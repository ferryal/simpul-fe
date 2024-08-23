import fetchApi from '.';
import { useTaskStore } from '../store';

export const getAllTasks = () =>
	fetchApi({
		path: '/tasks',
		method: 'GET',
		isTask: true,
	}).then((res) =>
		res.json().then((resJson) => {
			useTaskStore.getState().setData(resJson);
			return resJson;
		})
	);

export const addTask = (body: any) =>
	fetchApi({
		path: `/tasks`,
		method: 'POST',
		body,
		isTask: true,
	}).then((res) => res.json());

export const editTask = (id: string, body: any) =>
	fetchApi({
		path: `/tasks/${id}`,
		method: 'PUT',
		body,
		isTask: true,
	}).then((res) => res.json());

export const deleteTask = (id: string) =>
	fetchApi({
		path: `/tasks/${id}`,
		method: 'DELETE',
		isTask: true,
	}).then((res) => res.json());
