import React from 'react';
import { useInboxesStore } from '../../store';
import Chats from '../chats';
import Inboxes from './components/inboxes';

const Inbox: React.FC = () => {
	const { selectedInboxesId } = useInboxesStore();

	return selectedInboxesId ? <Chats /> : <Inboxes />;
};

export default Inbox;
