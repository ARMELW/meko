import { cn } from "@/utils/style";
import { ComponentProps, ReactNode } from "react";
import { Typography } from "../typography/typography";
type ColorVariant = 'default' | 'primary' | 'secondary' | 'error';

export function Card(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"rounded-2xl bg-meko-blue-transparent-1",
				props.className
			)}
		/>
	);
}

export function CardTitle({
	title,
	titleColor = 'default',
	subtitle,
	actions,
	className,
}: {
	title: string;
	titleColor?: ColorVariant
	subtitle?: string;
	className?: string;
	actions?: ReactNode;
}) {
	return (
		<div className={cn("bg-meko-blue-transparent-2 py-4 px-5 rounded-tl-2xl rounded-tr-2xl", className)}>
			<Typography as="h3" color={titleColor} weight="bold" styleCase="uppercase">
				{title}
			</Typography>
			{subtitle && (
				<Typography as="p" weight="default">
					{subtitle}
				</Typography>
			)}
			{actions}
		</div>
	);
}

export function CardContent(props: ComponentProps<"div">) {
	return <div {...props} className={cn("w-full p-5", props.className)} />;
}

export function CardFooter(props: ComponentProps<"div">) {
	return <div {...props} className={cn("w-full p-5 rounded-bl-2xl rounded-br-2xl", props.className)} />;
}
