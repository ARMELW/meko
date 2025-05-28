import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

import { LangProvider } from "./services/languages/provider";

export function Provider({ children }: PropsWithChildren) {
	return (<LangProvider>
		<QueryClientProvider client={queryClient} >
			{children}
		<ReactQueryDevtools initialIsOpen={false}/>
		</QueryClientProvider>
		
		</LangProvider>);
}
