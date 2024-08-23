import React from 'react';
import SearchBox from '../search-box';
import { useQuery } from '@tanstack/react-query';
import { getAllInboxes } from '../../../../api/inboxes';
import Loading from '../../../../components/loading';
import InboxesItem from '../inboxes-item';
import { TInboxes } from '../../../../api/types';
import { useInboxesStore } from '../../../../store';
import { useDebouncedCallback } from 'use-debounce';

const Inboxes: React.FC = () => {
	const { isFetching } = useQuery<TInboxes[]>({
		queryKey: ['getAllInboxes'],
		queryFn: getAllInboxes,
	});
	const { data } = useInboxesStore();
	const [query, setQuery] = React.useState('');

	const filteredData = React.useMemo(() => {
		const regex = new RegExp(`${query}`, 'gi');

		return data?.filter((item) => item.name.match(regex));
	}, [query, data]);

	const handleSearch = useDebouncedCallback((value: string) => {
		setQuery(value);
	}, 300);

	return (
		<div className="absolute right-[34px] bottom-[110px] h-[737px] w-[734px] bg-white py-[24px] px-[32px] rounded-md">
			<SearchBox handleSearch={handleSearch} />

			{isFetching ? (
				<Loading loadingText="Loading Chats ..." />
			) : (
				filteredData?.map((item, index) => (
					<InboxesItem
						key={index}
						data={item}
						isLastItem={index + 1 === filteredData.length}
					/>
				))
			)}
		</div>
	);
};

export default Inboxes;
