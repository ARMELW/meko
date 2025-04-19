import { cn } from "@/utils/style";
import { ComponentProps } from "react";

export function LessonCard(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"w-full max-w-[920px] bg-meko-blue-transparent-1 hover:bg-meko-blue-transparent-3 px-5 flex items-center justify-stretch gap-5 rounded-2xl overflow-hidden",
				props?.className
			)}
		/>
	);
}

export function LessonCardImage(props: ComponentProps<"img">) {
	return (
		<div className="max-w-[120px] w-full aspect-square rounded-xl overflow-hidden">
			<img {...props} className={cn("", props?.className)} />
		</div>
	);
}

export function LessonCardContent(props: ComponentProps<"div">) {
	return <div {...props} className={cn("py-4 w-full", props?.className)} />;
}

export function LessonCardAction(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				"flex justify-center items-center self-stretch",
				props?.className
			)}
		/>
	);
}
