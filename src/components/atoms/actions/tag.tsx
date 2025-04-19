import { cn } from "@/utils/style";
import { Typography } from "../typography/typography";

interface Props {
	label: string;
	selected?: boolean;
}

export function Tag({ selected, label }: Props) {
	return (
		<div
			className={cn(
				"px-5 py-1",
				selected && "border-1 border-meko-blue-light-1"
			)}
		>
			<Typography
				weight="bold"
				as="p"
				className="whitespace-nowrap"
				styleCase="uppercase"
			>
				{label}
			</Typography>
		</div>
	);
}
