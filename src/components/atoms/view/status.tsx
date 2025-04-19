import { cn } from "@/utils/style";
import { Typography } from "../typography/typography";
import {
	statusLabel,
	StatusVariantProps,
	statusVariants,
} from "./status-variant";

interface Props extends StatusVariantProps {
	className?: string;
}

export function Status({ size, status, className }: Props) {
	return (
		<div className={cn(statusVariants({ size, status }), className)}>
			<Typography
				styleCase="uppercase"
				weight="bold"
				variant={size === "small" ? "small" : "span"}
			>
				{statusLabel[status || "completed"]}
			</Typography>
		</div>
	);
}
