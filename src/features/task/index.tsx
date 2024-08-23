import React from 'react';
import TaskHeader from './components/header';
import { Collapse } from 'antd';
import TaskItemHeader from './components/item-header';
import { useQuery } from '@tanstack/react-query';
import { getAllTasks } from '../../api/tasks';
import Loading from '../../components/loading';
import { TTask } from '../../api/types';
import TaskItemBody from './components/item-body';
import { useTaskStore } from '../../store';

const Task: React.FC = () => {
	const { isFetching, refetch } = useQuery<TTask[]>({
		queryKey: ['getAllTasks'],
		queryFn: getAllTasks,
	});
	const { data } = useTaskStore();
	const [activeKey, setActiveKey] = React.useState<number[]>([]);

	const handleCollapse = (key: number) => {
		const newActiveKey = [...activeKey];
		const findIndex = newActiveKey.findIndex((item) => item === key);

		if (findIndex === -1) {
			newActiveKey.push(key);
			setActiveKey(newActiveKey);
			return;
		}

		newActiveKey.splice(findIndex, 1);
		setActiveKey(newActiveKey);
	};

	return (
		<div className="absolute right-[34px] bottom-[110px] h-[737px] w-[734px] bg-white py-[24px] px-[32px] rounded-md">
			<TaskHeader refetch={refetch} />

			{isFetching ? (
				<Loading loadingText="Loading Task List ..." />
			) : (
				<div className="h-[620px] overflow-y-scroll">
					<Collapse
						activeKey={activeKey}
						bordered={false}
						expandIcon={() => null}
						className="bg-transparent"
						items={data?.map((item, key) => ({
							key,
							label: (
								<TaskItemHeader
									data={item}
									isActive={activeKey.some((k) => k === key)}
									onCollapse={() => handleCollapse(key)}
									refetch={refetch}
								/>
							),
							children: (
								<TaskItemBody
									data={item}
									refetch={refetch}
								/>
							),
						}))}
					/>
				</div>
			)}
		</div>
	);
};

export default Task;
