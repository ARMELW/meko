import { cn } from "@/utils/style";
import { ComponentProps, forwardRef } from "react";

export interface Props extends Omit<ComponentProps<"input">, "size"> {
	size?: "normal" | "small" | "w-full";
	error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ size = "normal", error = false, ...props }, ref) => {
		const { className, ...rest } = props;
		return (
			<input
				ref={ref}
				type="text"
				className={cn(
					className,
					"bg-meko-blue-transparent-2 rounded-xl focus:border-meko-blue-light-1 focus:border-2 outline-none px-5",
					"placeholder:text-meko-blue-light-3 text-sm text-white",
					error && "border-2 border-meko-red-2 focus:border-red-2",
					size === "normal" && "h-[3.635rem]",
					size === "small" && "h-[2.6875rem]",
					size === "w-full" && "h-[2.6875rem] w-full"
				)}
				{...rest}
			/>
		);
	}
);

Input.displayName = "Input";
