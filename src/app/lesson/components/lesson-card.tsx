import { cn } from "@/utils/style";
import { ComponentProps } from "react";

export function LessonCard(props: ComponentProps<"div">) {
	return (
		<div
			{...props}
			className={cn(
				// Mobile: stacked card (image on top), Desktop: horizontal layout
				"w-full max-w-[920px] bg-meko-blue-transparent-1 hover:bg-meko-blue-transparent-3 px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5 rounded-2xl overflow-hidden",
				props?.className
			)}
		/>
	);
}

export function LessonCardImage(props: ComponentProps<"img">) {
	return (
		<div className="w-full sm:max-w-[120px] rounded-xl overflow-hidden">
			{/* Mobile: wider rectangle, Desktop: square */}
			<div className="w-full h-56 sm:h-auto sm:aspect-square overflow-hidden">
				<img {...props} className={cn("object-cover w-full h-full", props?.className)} />
			</div>
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
				// Full width action on mobile, auto width on desktop
				"flex justify-center items-center self-stretch w-full sm:w-auto",
				props?.className
			)}
		/>
	);
}
