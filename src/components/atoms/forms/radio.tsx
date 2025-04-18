import { cn } from "@/utils/style"; // Assuming you have this utility
import { useId, ChangeEvent, ComponentPropsWithoutRef } from "react";

// Define the props for the Radio component
interface RadioProps
	extends Omit<
		ComponentPropsWithoutRef<"input">,
		"type" | "onChange" | "checked" | "id" | "className" // Omit props handled specifically
	> {
	// 'checked' is essential for controlling radio buttons from the parent
	checked: boolean;
	// 'onChange' is essential for updating the parent's state
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	// 'name' is crucial for grouping radio buttons correctly
	name: string;
	// 'value' identifies this specific radio button's value when selected
	value: string | number;

	id?: string; // Allow passing an external ID
	className?: string; // ClassName for the wrapper label element
	"aria-label": string; // Enforce aria-label for accessibility as there's no visible label
	disabled?: boolean;
}

export function Radio({
	checked,
	onChange,
	id: externalId,
	name,
	value,
	disabled,
	className,
	"aria-label": ariaLabel, // Destructure aria-label
	...rest // Pass remaining input props
}: RadioProps) {
	const internalId = useId();
	const id = externalId ?? internalId;

	// Radio buttons are typically controlled, so 'checked' prop directly determines the state
	const displayChecked = checked;

	// Simple handler, just forwards the event
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (onChange) {
			onChange(event);
		}
	};

	return (
		<label
			htmlFor={id}
			className={cn(
				"inline-flex items-center justify-center cursor-pointer group", // Wrapper styles
				disabled && "opacity-60 cursor-not-allowed",
				className
			)}
		>
			<input
				type="radio"
				id={id}
				name={name} // Group radios together
				value={value} // Value for this option
				checked={displayChecked} // Controlled by prop
				onChange={handleChange}
				disabled={disabled}
				className="absolute opacity-0 w-0 h-0 peer" // Visually hidden but accessible
				aria-label={ariaLabel} // Accessibility requirement
				{...rest}
			/>

			{/* Custom radio visual representation */}
			<div
				className={cn(
					"flex-shrink-0",
					"w-6 h-6", // Size of the outer circle
					"border-2",
					"rounded-full", // Make it a circle
					"flex items-center justify-center", // Center the inner dot
					"transition-all duration-150 ease-in-out",
					"bg-transparent",
					// Border colors
					disabled
						? "border-gray-400 dark:border-gray-600"
						: displayChecked
						? "border-blue-500 dark:border-blue-400" // Slightly darker border when checked? (optional)
						: "border-blue-400 group-hover:border-blue-500 dark:border-blue-600 dark:group-hover:border-blue-400",
					// Focus ring
					"peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1",
					disabled
						? "peer-focus-visible:ring-gray-400"
						: "peer-focus-visible:ring-blue-500"
				)}
			>
				{/* Inner Dot - Conditionally rendered */}
				{displayChecked && (
					<div
						className={cn(
							"w-3 h-3", // Size of the inner dot
							"rounded-full",
							// Apply the gradient using arbitrary values
							"bg-gradient-to-b from-[#FF7F32] to-[#FA4616]"
						)}
					/>
				)}
			</div>
		</label>
	);
}
