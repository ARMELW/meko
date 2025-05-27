import { CONFIG } from "@/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
	token: string | null;
	accountId: number | null;
	accountType: "child" | "parent" | null;
	selectedChild: {
		id: string;
		firstname: string;
		lastname: string;
		avatarUrl?: string;
	} | null;
}

interface Action {
	login: (
		token: string,
		accountId: number,
		accountType: "child" | "parent"
	) => void;
	logout: () => void;
	selectChild: (child: NonNullable<State['selectedChild']>) => void;
	clearSelectedChild: () => void;
}

interface Store extends State, Action {}

export const useSession = create<Store>()(
	persist(
		(set) => ({
			token: null,
			accountId: null,
			accountType: null,
			selectedChild: null,
			login: (token, accountId, accountType) => {
				set({ token, accountId, accountType });
			},
			logout: () => {
				set({ 
					token: null, 
					accountId: null, 
					accountType: null,
					selectedChild: null 
				});
			},
			selectChild: (child) => {
				set({ selectedChild: child });
			},
			clearSelectedChild: () => {
				set({ selectedChild: null });
			}
		}),
		{
			name: CONFIG.SESSION_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
