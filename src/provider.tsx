import { PropsWithChildren } from "react";
import { LangProvider } from "./services/languages/provider";

export function Provider({ children }: PropsWithChildren) {
	return <LangProvider>{children}</LangProvider>;
}
