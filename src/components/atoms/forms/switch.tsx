import { cn } from "@/utils/style"; // Assuming you have this utility
import {
   useState,
   useId,
   ChangeEvent,
   ComponentPropsWithoutRef,
} from "react";

// Define the props for the ToggleSwitch component
interface Props
   extends Omit<
      ComponentPropsWithoutRef<"input">,
      // Omit props handled specifically or not applicable
      | "type"
      | "onChange"
      | "checked"
      | "defaultChecked" // Also omit defaultChecked from input props type
      | "id"
      | "className"
      | "value"
      | "name"
   > {
   // For controlled component: current state
   checked?: boolean;
   // For uncontrolled component: initial state
   defaultChecked?: boolean;
   // Callback when state changes (works for both modes)
   onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
   id?: string; // Allow passing an external ID
   className?: string; // ClassName for the wrapper label element
   trackClassName?: string; // Optional className for the track div
   knobClassName?: string; // Optional className for the knob div
   "aria-label": string; // Enforce aria-label for accessibility
   disabled?: boolean;
}

export function Switch({
   checked,
   defaultChecked = false, // Default initial state for uncontrolled mode
   onChange,
   id: externalId,
   disabled,
   className,
   trackClassName,
   knobClassName,
   "aria-label": ariaLabel, // Destructure aria-label
   ...rest // Pass remaining input props
}: Props) {
   // --- Controlled vs Uncontrolled Logic ---
   const [internalChecked, setInternalChecked] =
      useState<boolean>(defaultChecked);
   const isControlled = checked !== undefined;
   // Use the controlled 'checked' prop if provided, otherwise use internal state
   const displayChecked = isControlled ? checked : internalChecked;
   // -----------------------------------------

   const internalId = useId();
   const id = externalId ?? internalId;

   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newCheckedState = event.target.checked;

      // If uncontrolled, update the internal state
      if (!isControlled) {
         setInternalChecked(newCheckedState);
      }

      // Always call the passed onChange handler, if provided
      if (onChange) {
         onChange(event);
      }
   };

   return (
      <label
         htmlFor={id}
         className={cn(
            "inline-flex items-center cursor-pointer group", // Wrapper styles
            disabled && "opacity-60 cursor-not-allowed",
            className
         )}
      >
         {/* Hidden Checkbox for state and accessibility */}
         <input
            type="checkbox"
            id={id}
            role="switch"
            // Use the determined state (controlled or internal)
            checked={displayChecked}
            onChange={handleChange}
            disabled={disabled}
            className="absolute opacity-0 w-0 h-0 peer" // Visually hidden but accessible
            aria-label={ariaLabel} // Accessibility requirement
            aria-checked={displayChecked}
            {...rest}
         />

         {/* Visual Track */}
         <div
            className={cn(
               "relative w-12 h-6", // Track dimensions
               "flex items-center",
               "rounded-full", // Rounded track
               "border border-meko-blue-light-1/30 group-hover:border-meko-blue-light-1/30", // Border like the image
               "transition-colors duration-200 ease-in-out",
               disabled ? "bg-gray-600 border-gray-700" : "bg-meko-blue-transparent-2",
               "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2",
               disabled
                  ? "peer-focus-visible:ring-gray-500"
                  : "peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-blue-700",
               trackClassName
            )}
         >
            {/* Visual Knob */}
            <div
               className={cn(
                  "absolute left-0.5", // Start position
                  "w-5 h-5", // Knob dimensions
                  "rounded-full", // Circular knob
                  "transition-transform duration-200 ease-in-out",
                  "bg-gradient-to-b from-[#FF7F32] to-[#FA4616]", // Knob background
                  // Move knob based on the determined state (controlled or internal)
                  displayChecked && "translate-x-[calc(3rem-1.25rem-0.25rem)]",
                  knobClassName
               )}
            />
         </div>
      </label>
   );
}