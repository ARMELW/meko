import { cn } from "@/utils/style";
import { ComponentProps } from "react";
import { Typography } from "../typography/typography";

export function Menu(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"rounded-2xl bg-meko-blue-darker border-1 border-meko-blue-flat",
				props.className
			)}
		/>
	);
}

export function MenuTitle({
	title,
	className,
}: {
	title: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"bg-meko-blue-transparent-2 py-4 px-5 rounded-tl-2xl rounded-tr-2xl",
				className
			)}
		>
			<Typography variant="small" weight="bold" styleCase="uppercase">
				{title}
			</Typography>
		</div>
	);
}

export function MenuContent(props: ComponentProps<"div">) {
	return <div {...props} className={cn("", props.className)} />;
}
