import { create } from 'zustand';
import { TInboxes } from '../api/types';

type InboxesState = {
	selectedInboxesId?: string;
	data: TInboxes[] | null;
};
type InboxesAction = {
	setData: (data: TInboxes[]) => void;
	setSelectedInboxesId: (selectedInboxesId?: string) => void;
};

export const useInboxesStore = create<InboxesState & InboxesAction>((set) => ({
	selectedInboxesId: undefined,
	data: null,
	setSelectedInboxesId: (selectedInboxesId) => set({ selectedInboxesId }),
	setData: (data) => set({ data }),
}));
