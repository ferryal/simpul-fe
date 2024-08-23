import { INBOX_API_BASE_URL, TASK_API_BASE_URL } from './config';

type fetchApiPayload = {
	isTask?: boolean;
	path: string;
	method: string;
	body?: BodyInit;
};

const fetchApi = ({ path, body, method, isTask }: fetchApiPayload) =>
	fetch(`${isTask ? TASK_API_BASE_URL : INBOX_API_BASE_URL}${path}`, {
		body: JSON.stringify(body),
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});

export default fetchApi;
