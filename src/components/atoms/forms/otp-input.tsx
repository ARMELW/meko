import { ChangeEvent, forwardRef, ForwardedRef } from "react";
import { cn } from "@/utils/style";

interface OtpInputProps {
	value?: string;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	[key: string]: unknown;
}
export const OtpInput = forwardRef(function OtpInput(
	{
		value,
		error = false,
		disabled = false,
		onChange,
		className,
		...props
	}: OtpInputProps,
	ref: ForwardedRef<HTMLInputElement>
) {
	return (
		<input
			ref={ref}
			type="text"
			inputMode="numeric"
			pattern="[0-9]*"
			maxLength={1}
			value={value}
			onChange={onChange}
			{...props}
			className={cn(
				// Base styles - resembling the Input component and image
				"w-12 h-14", // Adjust size as needed
				"bg-meko-blue-transparent-2", // From Input example
				"rounded-xl",
				"border-2", // Base border width
				"text-center text-white text-2xl font-semibold", // Adjust font
				"transition-colors duration-150 ease-in-out",
				"focus:outline-none", // Remove default focus outline
				// Conditional Border Colors
				error
					? "border-meko-red-2 focus:border-meko-red-2" // Error state overrides focus
					: disabled
						? "border-gray-600" // Disabled border
						: "border-transparent focus:border-meko-blue-light-1", // Default transparent, blue on focus
				disabled && "opacity-50 cursor-not-allowed",
				className
			)}
		/>
	);
});

OtpInput.displayName = "OtpInput";