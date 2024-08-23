import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import React from 'react';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { addTask } from '../../../../api/tasks';
import { TTask } from '../../../../api/types';

type TaskHeaderProps = {
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TTask[], Error>>;
};

const TaskHeader: React.FC<TaskHeaderProps> = ({ refetch }) => {
	const { mutateAsync, isPending } = useMutation({
		mutationFn: (payload: any) => addTask(payload.body),
	});

	const MY_TASK_DROPDOWN_ITEMS: MenuProps['items'] = [
		{
			key: '1',
			label: 'Personal Errands',
		},
		{
			key: '2',
			label: 'Urgent To-Do',
		},
	];

	const handleAdd = async () => {
		const newData: TTask = {
			isDone: false,
			name: '',
			description: '',
			dueDate: null,
			tag: [],
		};

		await mutateAsync({
			body: newData,
		});
		await refetch();
	};

	return (
		<div className="flex justify-between items-center pl-[85.23px] mb-[22px]">
			<Dropdown
				trigger={['click']}
				menu={{ items: MY_TASK_DROPDOWN_ITEMS }}
				placement="bottom"
			>
				<Button className="border-[#828282] h-[40px] text-[#4F4F4F]">
					<Space>
						My Task
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<Button
				className="bg-[#2F80ED] text-white w-[98.8px] h-[40px]"
				onClick={handleAdd}
				loading={isPending}
			>
				New Task
			</Button>
		</div>
	);
};

export default TaskHeader;
