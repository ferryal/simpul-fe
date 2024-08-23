export type TInboxes = {
	isGroup: boolean;
	isRead: boolean;
	lastChatTime: number;
	name: string;
	lastChat: string;
	lastSender: string;
	id: string;
};

export type TChatItem = {
	id: string;
	replyId: string;
	chat: string;
	sender: string;
	senderColor?: string;
	time: number;
	bubbleColor?: string;
};

export type TChat = {
	[x: string]: TChatItem[];
};

export type TChats = {
	id: string;
	name: string;
	isGroup: boolean;
	inboxesId: string;
	totalParticipants: number;
	lastUnReadChatId: string;
	chats: TChat;
};

export type TTask = {
	name: string;
	isDone: boolean;
	dueDate?: number | null;
	description?: string;
	tag?: string[];
	id?: string;
};
