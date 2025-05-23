import { cn } from "@/utils/style"; // Assuming you have this utility for merging class names
import {
	useState,
	useId,
	ChangeEvent,
	FC,
	ComponentPropsWithoutRef,
} from "react";

const CheckmarkIcon: FC = () => (
	<svg
		width="16"
		height="14"
		viewBox="0 0 26 22"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className="w-4 h-auto"
	>
		<path
			d="M9.87135 21.5L0 12.4911L3.96543 7.42423L9.87135 13.1223L21.8092 0.5L25.9772 4.76676L9.87135 21.5Z"
			fill="url(#paint0_linear_282_1023_ts)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_282_1023_ts"
				x1="12.9886"
				y1="0.5"
				x2="12.9886"
				y2="21.5"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#FF7F32" />
				<stop offset="1" stopColor="#FA4616" />
			</linearGradient>
		</defs>
	</svg>
);

interface CheckboxProps
	extends Omit<
		ComponentPropsWithoutRef<"input">,
		"type" | "onChange" | "checked" | "defaultChecked" | "id" | "className" // Omit className from input props type
	> {
	checked?: boolean;
	defaultChecked?: boolean;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	id?: string;
	className?: string; // ClassName for the wrapper label element
	"aria-label"?: string; // Add aria-label for accessibility since there's no visible label
	label?: string;
}

export function Checkbox({
	checked,
	defaultChecked = false,
	onChange,
	id: externalId,
	name,
	value,
	disabled,
	className,
	"aria-label": ariaLabel, // Destructure aria-label
	label,
	...rest
}: CheckboxProps) {
	const [internalChecked, setInternalChecked] =
		useState<boolean>(defaultChecked);
	const internalId = useId();
	const id = externalId ?? internalId;
	const isControlled = checked !== undefined;
	const displayChecked = isControlled ? checked : internalChecked;

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newCheckedState = event.target.checked;
		if (!isControlled) {
			setInternalChecked(newCheckedState);
		}
		if (onChange) {
			onChange(event);
		}
	};

	// Ensure accessibility when no visible label is present
	// An aria-label should be provided via props in this case.
	if (!ariaLabel && process.env.NODE_ENV === "development") {
		console.warn(
			"Checkbox component is missing an `aria-label` prop. This is needed for accessibility when no visible label is associated with the checkbox."
		);
	}

	return (
		<label
			htmlFor={id}
			className={cn(
				"inline-flex items-center justify-center cursor-pointer group", // Use inline-flex and center, removed space-x-*
				disabled && "opacity-60 cursor-not-allowed",
				className // Apply className to the wrapper
			)}
		>
			<input
				type="checkbox"
				id={id}
				name={name}
				value={value}
				checked={displayChecked}
				onChange={handleChange}
				disabled={disabled}
				className="absolute opacity-0 w-0 h-0 peer"
				aria-label={ariaLabel} // Apply aria-label to hidden input
				{...rest}
			/>

			<div
				className={cn(
					"flex-shrink-0",
					"w-6 h-6",
					"border-2",
					"rounded-md",
					"flex items-center justify-center",
					"transition-all duration-150 ease-in-out",
					"bg-meko-blue-transparent-2",
					disabled
						? "border-gray-400 dark:border-gray-600"
						: "border-meko-blue-light-1/30 group-hover:border-meko-blue-light-1/30",
					"peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1",
					disabled
						? "peer-focus-visible:ring-gray-400"
						: "peer-focus-visible:ring-blue-500"
				)}
			>
				{displayChecked && <CheckmarkIcon />}
			</div>

			{label && (
				<span className="ml-2 text-white text-sm select-none">
					{label}
				</span>
			)}
		</label>
	);
}
