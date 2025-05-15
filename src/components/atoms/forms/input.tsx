import { cn } from "@/utils/style";
import { ComponentProps } from "react";

export interface Props extends Omit<ComponentProps<"input">, "size"> {
	size?: "normal" | "small";
	error?: boolean;
}

export function Input({ size = "normal", error = false, ...props }: Props) {
	return (
		<input
			type="text"
			className={cn(
				"bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none px-5",
				"placeholder:text-meko-blue-light-3 text-lg text-white",
				error && "border-2 border-meko-red-2 focus:border-red-2",
				size === "normal" && "h-[3.635rem]",
				size === "small" && "h-[2.6875rem]",
				props?.className
			)}
			{...props}
		/>
	);
}
