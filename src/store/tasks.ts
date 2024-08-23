import { create } from 'zustand';
import { TTask } from '../api/types';

type TasksState = {
	data: TTask[] | null;
};

type TasksAction = {
	setData: (data: TTask[]) => void;
};

export const useTaskStore = create<TasksState & TasksAction>((set) => ({
	data: null,
	setData: (data) => set({ data }),
}));
