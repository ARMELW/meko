import { PropsWithChildren } from "react";
import i18n from ".";
import { I18nextProvider } from "react-i18next";

export function LangProvider({ children }: PropsWithChildren) {
	return (
		<I18nextProvider i18n={i18n} defaultNS={"translation"}>
			{children}
		</I18nextProvider>
	);
}
