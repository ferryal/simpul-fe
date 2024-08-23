import React from 'react';
import { ArrowDownwardIcon } from '../../../../icons';

const NewMessageSeparator: React.FC = () => {
	const [isVisible, setIsVisible] = React.useState(true);

	React.useEffect(() => {
		let body = document.getElementById('body');
		body?.addEventListener('scroll', listenToScroll);

		return body?.addEventListener('scroll', listenToScroll);
	}, []);

	const listenToScroll = () => {
		let heightToShowFrom = 80;
		let body = document.getElementById('body');
		if (body) {
			const winScroll = body?.scrollTop;

			if (winScroll <= heightToShowFrom) setIsVisible(true);
			else setIsVisible(false);
		}
	};

	return (
		<>
			{isVisible && (
				<div className="sticky bottom-3">
					<div className="flex justify-center">
						<div className="text-[#2F80ED] bg-[#E9F3FF] w-fit px-3 py-2 flex items-center rounded-[5px]">
							New Message
							<ArrowDownwardIcon />
						</div>
					</div>
				</div>
			)}
			<div className="flex justify-center items-center">
				<hr className="h-0 w-full border-[#EB5757]" />
				<div className="flex items-center w-[50%] justify-center gap-x-2">
					<div className="text-[#EB5757] lato-bold font-[14px]">
						New Message
					</div>
					<div>
						<ArrowDownwardIcon />
					</div>
				</div>
				<hr className="h-0 w-full border-[#EB5757]" />
			</div>
		</>
	);
};

export default NewMessageSeparator;
