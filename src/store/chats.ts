import { create } from 'zustand';
import { TChats } from '../api/types';

type ChatsState = {
	data: TChats | null;
	selectedId: string | null;
};

type ChatsAction = {
	setData: (data: TChats) => void;
	setSelectedId: (selectedId: string | null) => void;
};

export const useChatsStore = create<ChatsState & ChatsAction>((set) => ({
	data: null,
	selectedId: null,
	setData: (data) => set({ data }),
	setSelectedId: (selectedId) => set({ selectedId }),
}));
