import { ComponentProps } from "react";
import { Typography } from "../typography/typography";
import { cn } from "@/utils/style";
import { TypoVariantProps } from "../typography/typography-variant";

export function Table(props: ComponentProps<"table">) {
	return (
		<table
			{...props}
			className={cn("w-full rounded-md overflow-hidden", props?.className)}
		/>
	);
}

export function TableHeader(props: ComponentProps<"thead">) {
	return (
		<thead
			{...props}
			className={cn("[&>*]:hover:!bg-transparent", props?.className)}
		/>
	);
}

export function TableRow(props: ComponentProps<"tr">) {
	return (
		<tr
			{...props}
			className={cn(
				"cursor-pointer transition-all duration-500 hover:!bg-meko-dark-blue-transparent",
				props.className
			)}
		/>
	);
}

export function TableHead({
	asChild,
	containerClassName,
	...props
}: { asChild?: boolean; containerClassName?: string } & ComponentProps<"th">) {
	return (
		<th {...props} className={cn("py-2.5", props?.className)}>
			<div
				className={cn(
					"min-h-[40px] flex items-center justify-center",
					containerClassName
				)}
			>
				{asChild ? (
					props.children
				) : (
					<Typography color="primary" variant="small" shadow="sm">
						{props.children}
					</Typography>
				)}
			</div>
		</th>
	);
}

export function TableBody(props: ComponentProps<"tbody">) {
	return (
		<tbody
			{...props}
			className={cn(
				"[&>*:nth-child(odd)]:bg-meko-blue-transparent-3 [&>*:nth-child(even)]:bg-meko-blue-transparent-1 py-2.5",
				props?.className
			)}
		/>
	);
}

export function TableCell<T extends boolean>({
	asChild,
	align = "center",
	containerClassName,
	variant = "p4",
	weight = "bold",
	color = "default",
	styleCase = "default",
	...props
}: {
	asChild?: T;
	containerClassName?: string;
	align?: "left" | "right" | "center";
} & ComponentProps<"td"> &
	TypoVariantProps) {
	return (
		<td {...props} className={cn("", props?.className)}>
			<div
				className={cn(
					"min-h-[60px] p-2.5 flex items-center",
					align === "center" && "justify-center",
					align === "left" && "justify-start",
					align === "right" && "justify-end",
					containerClassName
				)}
			>
				{asChild ? (
					props.children
				) : (
					<Typography
						styleCase={styleCase}
						color={color}
						variant={variant}
						weight={weight}
					>
						{props.children}
					</Typography>
				)}
			</div>
		</td>
	);
}

export function TableFooter(props: ComponentProps<"tfoot">) {
	return <tfoot {...props} />;
}
