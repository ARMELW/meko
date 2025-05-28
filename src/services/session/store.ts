import { CONFIG } from "@/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
	selectedChild: {
		id: string;
		firstname: string;
		lastname: string;
		avatarUrl?: string;
	} | null;
}

interface Action {
	login: (selectedChild: any) => void;
	logout: () => void;
}

interface Store extends State, Action { }

export const useSession = create<Store>()(
	persist(
		(set) => ({
			selectedChild: null,
			login: (selectedChild) => {
				set({
					selectedChild: selectedChild
				});
			},
			logout: () => {
				set({

					selectedChild: null
				});
			}
		}),
		{
			name: CONFIG.SESSION_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
