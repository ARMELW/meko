import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
const queryClient = new QueryClient()

import { LangProvider } from "./services/languages/provider";

export function Provider({ children }: PropsWithChildren) {
	return (
		<LangProvider>
			<NuqsAdapter>
				<QueryClientProvider client={queryClient} >
					{children}
				</QueryClientProvider>
			</NuqsAdapter>
		</LangProvider>
	);
}
