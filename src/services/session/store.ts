import { CONFIG } from "@/config";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware/persist";

interface State {
	token: string | null;
	accountId: number | null;
	accountType: "child" | "parent" | null;
}

interface Action {
	login: (
		token: string,
		accountId: number,
		accountType: "child" | "parent"
	) => void;
	logout: () => void;
}

interface Store extends State, Action {}

export const useSession = create<Store>()(
	persist(
		(set) => ({
			token: null,
			accountId: null,
			accountType: null,
			login: (token, accountId, accountType) => {
				set({ token, accountId, accountType });
			},
			logout: () => {
				set({ token: null, accountId: null, accountType: null });
			},
		}),
		{
			name: CONFIG.SESSION_KEY,
			storage: createJSONStorage(() => localStorage),
		}
	)
);
