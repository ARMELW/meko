import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const queryClient = new QueryClient()

import { LangProvider } from "./services/languages/provider";

export function Provider({ children }: PropsWithChildren) {
	return (
		<LangProvider>
			<NuqsAdapter>
				<QueryClientProvider client={queryClient} >
					{children}
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</NuqsAdapter>
		</LangProvider>
	);
}
