import React from 'react';
import { BookmarksIcon, ClockIcon, PencilIcon } from '../../../../icons';
import { DatePicker, DatePickerProps, Dropdown, MenuProps } from 'antd';
import Paragraph from 'antd/es/typography/Paragraph';
import dayjs from 'dayjs';
import './index.scss';
import {
	QueryObserverResult,
	RefetchOptions,
	useMutation,
} from '@tanstack/react-query';
import { editTask } from '../../../../api/tasks';
import { TTask } from '../../../../api/types';
import { useDebouncedCallback } from 'use-debounce';
import { TAG } from '../../constants';

type TaskItemBodyProps = {
	data: TTask;
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<TTask[], Error>>;
};

const TaskItemBody: React.FC<TaskItemBodyProps> = ({ data, refetch }) => {
	const [isEditDesc, setIsEditDesc] = React.useState(false);
	const { mutateAsync: editTaskAsync } = useMutation({
		mutationFn: (payload: any) => editTask(payload.id, payload.body),
	});

	const handleChangeDatePicker: DatePickerProps['onChange'] = async (
		dateString: dayjs.Dayjs
	) => {
		if (!dateString) return;
		const dateNum = new Date(dateString.toDate()).getTime() / 1000;

		const newData: TTask = {
			...data,
			dueDate: dateNum,
		};

		await editTaskAsync({
			id: data.id,
			body: newData,
		});

		await refetch();
	};

	const handleChangeDescription = useDebouncedCallback(async (value) => {
		const newDescription = value?.trim();
		if (data.description === newDescription) return;
		const newData: TTask = {
			...data,
			description: newDescription,
		};

		await editTaskAsync({
			id: data.id,
			body: newData,
		});

		await refetch();
	}, 1000);

	const handleSelectTag: MenuProps['onSelect'] = async (key) => {
		if (data.tag?.some((i) => key.key === i)) return;

		const newTags = [...(data.tag || [])];

		newTags.push(key.key);

		const newData: TTask = {
			...data,
			tag: newTags,
		};

		await editTaskAsync({
			id: data.id,
			body: newData,
		});

		await refetch();
	};

	const handleDeselectTag: MenuProps['onDeselect'] = async (key) => {
		const findIndex = data.tag?.findIndex((i) => i === key.key);
		if (findIndex === undefined || findIndex === -1) return;

		const newTags = [...(data.tag || [])];

		newTags.splice(findIndex, 1);

		const newData: TTask = {
			...data,
			tag: newTags,
		};

		await editTaskAsync({
			id: data.id,
			body: newData,
		});

		await refetch();
	};
	return (
		<>
			<div className="pl-[36px]">
				<div className="flex items-center gap-x-[19.67px] mb-[24px]">
					<div>
						<ClockIcon isLightsUp={!!data.dueDate} />
					</div>

					<div>
						<DatePicker
							value={
								data.dueDate
									? dayjs(data.dueDate * 1000)
									: undefined
							}
							format={{ format: 'DD/MM/YYYY' }}
							placeholder="Set Date"
							className="custom-date-picker border-[#828282]"
							onChange={handleChangeDatePicker}
						/>
					</div>
				</div>

				<div className="flex items-start gap-x-[32px] mb-3">
					<div
						className="cursor-pointer"
						onClick={() => setIsEditDesc(!isEditDesc)}
					>
						<PencilIcon isLightsUp={!!data.description} />
					</div>

					<div className="w-full">
						<Paragraph
							className="max-w-[518px] lato-regular"
							editable={{
								enterIcon: null,
								text: data.description ? data.description : '',
								triggerType: ['text'],
								editing: isEditDesc,
								onChange: (value) =>
									handleChangeDescription(value),
							}}
							onClick={() => setIsEditDesc(true)}
						>
							{data.description || 'No Description'}
						</Paragraph>
					</div>
				</div>
			</div>
			<div className="pl-[24px]">
				<div className="bg-[#F9F9F9] flex items-start gap-x-[19.67px] py-[14px] px-[10px] rounded-[5px]">
					<Dropdown
						overlayClassName="custom-dropdown"
						trigger={['click']}
						placement="topLeft"
						menu={{
							selectable: true,
							multiple: true,
							selectedKeys: [...(data.tag || [])],
							onSelect: handleSelectTag,
							onDeselect: handleDeselectTag,
							items: Object.keys(TAG).map((item) => ({
								key: item,
								label: TAG[item].name,
								className: 'lato-bold',
								style: {
									color: '#4F4F4F',
									backgroundColor: TAG[item].color,
									margin: '16px 14px',
								},
							})),
						}}
					>
						<a onClick={(e) => e.preventDefault()}>
							<BookmarksIcon
								isLightsUp={data.tag && data.tag.length > 0}
							/>
						</a>
					</Dropdown>
					<div className="flex flex-wrap gap-2">
						{data.tag &&
							data.tag.map((item: string, index) => (
								<div
									key={index}
									className="py-2 px-3 text-[#4F4F4F] rounded-[5px] lato-bold"
									style={{ backgroundColor: TAG[item].color }}
								>
									{TAG[item].name}
								</div>
							))}
					</div>
				</div>
			</div>
		</>
	);
};

export default TaskItemBody;
