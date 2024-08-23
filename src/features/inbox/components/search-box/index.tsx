import { Input } from 'antd';
import React from 'react';
import { InboxSearchIcon } from '../../../../icons';
import './index.scss';

type SearchBoxProps = {
	handleSearch: (value: string) => void;
};

const SearchBox: React.FC<SearchBoxProps> = ({ handleSearch }) => {
	return (
		<Input
			className="custom-search-box border-[#828282] px-[58.82px] py-[10.04px] placeholder-shown:!text-[#333333]"
			placeholder="Search"
			suffix={<InboxSearchIcon />}
			onChange={(e) => handleSearch(e.target.value)}
		/>
	);
};

export default SearchBox;
