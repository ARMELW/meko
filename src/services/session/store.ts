import { CONFIG } from "@/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface Child {
	id: string;
	firstname: string;
	lastname?: string;
	avatarUrl?: string;
}

interface State {
	selectedChild: Child | null;
}
interface Action {
	login: (selectedChild: Child) => void;
	logout: () => void;
}

interface Store extends State, Action { }

export const useSession = create<Store>()(
	persist(
		(set) => ({
			selectedChild: null,
			login: (selectedChild) => {
				set({
					selectedChild: {
						...selectedChild,
						lastname: selectedChild.lastname || '',
					}
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
