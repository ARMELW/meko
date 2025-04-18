import { cn } from "@/utils/style";
import { typographyVariant } from "./typography-variant";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"label"> & {
	uppercase?: boolean;
};

export function Label({ uppercase, ...props }: Props) {
	return (
		<label
			className={cn(
				typographyVariant({
					variant: "p",
					color: "primary",
				}),
				uppercase && "uppercase font-black",
				"flex items-center gap-4 mb-2",
				props?.className
			)}
			{...props}
		>
			{props.children}
		</label>
	);
}
