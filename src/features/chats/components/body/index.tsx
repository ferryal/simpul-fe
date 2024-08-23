import React from 'react';
import { TChat, TChats } from '../../../../api/types';
import ChatBubble from '../bubble';
import ChatDateSeparator from '../date-separator';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

type ChatBodyProps = {
	data?: TChat;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TChats, Error>>;
};

const ChatBody: React.FC<ChatBodyProps> = ({ data, refetch }) => {
	const keys = Object.keys(data || {});

	React.useEffect(() => {
		let body = document.getElementById('body');

		if (body) body.scrollTop = body.scrollHeight;
	}, [data]);

	return (
		<div className="pl-[29px] pr-[11px]">
			<div
				id="body"
				className="h-[592px] overflow-y-scroll flex flex-col"
			>
				{keys.map((item, index) => (
					<React.Fragment key={index}>
						{(data || {})[item]?.length > 0 && (
							<ChatDateSeparator date={item} />
						)}

						{(data || {})[item].map((chat, chatIndex) => (
							<ChatBubble
								key={`${index}-${chatIndex}`}
								data={chat}
								refetch={refetch}
							/>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default ChatBody;
