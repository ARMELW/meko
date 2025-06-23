import { Card, CardContent, CardFooter, Typography } from "@/components";
import {
	statusLabel,
	statusVariants,
} from "@/components/atoms/view/status-variant";
import { cn } from "@/utils/style";
import { truncateText } from "@/utils/text";

interface Props {
	src: string;
	altSrc: string;
	title: string;
	status: "inProgress" | "completed" | "blocked" | "toDiscover";
	progress?: string;
	onClick?: () => void;
}

export function ModuleCard({
	src,
	altSrc,
	title,
	status,
	progress,
	onClick,
}: Props) {
	return (
		<Card className="lg:max-w-[204px] cursor-pointer" onClick={onClick}>
			<CardContent className="p-2.5">
				<img
					src={src}
					alt={altSrc}
					className="w-full aspect-square rounded-lg"
				/>
				<div className="flex items-center justify-center w-full pt-5 pb-3.5">
					<Typography
						align="center"
						styleCase="uppercase"
						color="default"
						weight="bold"
						className="truncate px-2"
						title={title}
					>
						{truncateText(title, 20)}
					</Typography>
				</div>
			</CardContent>
			<CardFooter
				className={cn(
					"p-0",
					statusVariants({ size: "small", status: status })
				)}
			>
				<Typography
					styleCase="uppercase"
					shadow="sm"
					weight="bold"
					variant="small"
				>
					{statusLabel[status]} {!!progress && progress}
				</Typography>
			</CardFooter>
		</Card>
	);
}
