import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

const ConnectInfo: React.FC = () => {
	return (
		<div className="absolute bottom-12 pl-[29px] pr-[32px] w-full">
			<div className="p-[10px] bg-[#E9F3FF] flex items-center gap-x-[11px] rounded-[5px]">
				<LoadingOutlined className="text-[18.34px] text-[#2F80ED] " />
				<div className="text-[#4F4F4F] lato bold">
					Please wait while we connect you with one of our team ...
				</div>
			</div>
		</div>
	);
};

export default ConnectInfo;
