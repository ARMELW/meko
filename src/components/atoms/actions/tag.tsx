import { cn } from "@/utils/style";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
	selected?: boolean;
}

export function Tag({ selected, children }: Props) {
	return (
		<div className={cn("px-5 py-1", selected && "border-1 border-meko-blue-light-1")}>
			{children}
		</div>
	);
}
