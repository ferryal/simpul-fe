import { create } from 'zustand';
import { ActiveType } from '../layouts/main-layout/types';

type FloatButtonState = {
	activeType: ActiveType;
};

type FloatButtonAction = {
	setActiveType: (activeType: ActiveType) => void;
};

export const useFloatButtonStore = create<
	FloatButtonState & FloatButtonAction
>()((set) => ({
	activeType: undefined,
	setActiveType: (activeType) => set({ activeType }),
}));
