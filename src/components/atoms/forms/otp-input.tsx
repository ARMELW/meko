import { ChangeEvent } from "react";
import { cn } from "@/utils/style"; // Assuming you have this utility

// Define the props for the OtpInput component
interface Props {
	value?: string;
	error?: boolean;
	disabled?: boolean;
	className?: string;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function OtpInput({
	value,
	error = false,
	disabled = false,
	onChange,
	className,
}: Props) {
	return (
		<input
			type="text"
			inputMode="numeric"
			pattern="[0-9]*"
			maxLength={1}
			value={value}
			onChange={onChange}
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
}
