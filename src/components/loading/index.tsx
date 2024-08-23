import { LoadingOutlined } from '@ant-design/icons';
import React from 'react';

type LoadingProps = {
	loadingText?: string;
};

const Loading: React.FC<LoadingProps> = ({ loadingText }) => {
	return (
		<div className="flex flex-col gap-y-[12.7px] justify-center items-center text-[#4F4F4F] h-full lato-bold text-[16px]">
			<LoadingOutlined className="text-[85.41px] text-[#C4C4C4]" />
			{loadingText ? loadingText : 'Loading...'}
		</div>
	);
};

export default Loading;
