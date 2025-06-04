import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

import { LangProvider } from "./services/languages/provider";

export function Provider({ children }: PropsWithChildren) {
	return (<LangProvider>
		<QueryClientProvider client={queryClient} >
			{children}
		</QueryClientProvider>
		
		</LangProvider>);
}
