import { cn } from "@/utils/style";
import { Typography } from "../typography/typography";

interface Props {
	label: string;
	selected?: boolean;
	onClick?: () => void;
}

export function MenuOption({ label, selected, onClick }: Props) {
	return (
		<div
			onClick={onClick}
			className={cn(
				"active:scale-[0.99] cursor-pointer transition-transform",
				"group bg-transparent hover:bg-meko-blue-transparent-1 px-5 py-4 text-meko-blue-light-3 cursor-pointer rounded-lg",
				selected && "bg-meko-blue-transparent-2 text-white"
			)}


		>
			<Typography
				as="h3"
				styleCase="uppercase"
				weight="bold"
				variant="small"
				color={selected ? "default" : "secondary"}
			>
				{label}
			</Typography>
		</div>
	);
}
