import { cva, VariantProps } from "class-variance-authority";

export type StatusVariantProps = VariantProps<typeof statusVariants>;

export const statusVariants = cva(
	"text-white px-2.5 inline-flex justify-center items-center",
	{
		variants: {
			size: {
				normal: "text-base py-2",
				small: "text-sm py-0.5",
			},
			status: {
				inProgress: "bg-meko-orange",
				completed: "bg-meko-green",
				blocked: "bg-meko-red",
				toDiscover: "bg-meko-blue-transparent-1",
			},
		},
		defaultVariants: {
			size: "normal",
			status: "inProgress",
		},
	}
);

export const statusLabel = {
	inProgress: "in-progress",
	completed: "completed",
	blocked: "blocked",
	toDiscover: "to-discover",
} as const;
