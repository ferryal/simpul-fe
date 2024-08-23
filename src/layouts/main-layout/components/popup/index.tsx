import React from 'react';
import { useFloatButtonStore } from '../../../../store';
import Inbox from '../../../../features/inbox';
import Task from '../../../../features/task';

const Popup: React.FC = () => {
	const { activeType } = useFloatButtonStore();

	return activeType === 'inbox' ? (
		<Inbox />
	) : activeType === 'task' ? (
		<Task />
	) : (
		<></>
	);
};

export default Popup;
