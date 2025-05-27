import { cn } from "@/utils/style";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> &
	VariantProps<typeof btnContainerVariant> &
	VariantProps<typeof btnVariant> & {
		innerClassName?: string;
		loading?: boolean;
	};

function Spinner({ className }: { className?: string }) {
	return (
		<div
			className={cn(
				"animate-spin rounded-full border-2 border-current border-t-transparent",
				className
			)}
		/>
	);
}

export function LoadingButton({ 
	variant, 
	size, 
	children, 
	loading = false,
	disabled,
	...props 
}: Props) {
	const isDisabled = disabled || loading;
	const currentVariant = isDisabled ? "disable" : variant;

	return (
		<button
			className={cn(
				"group w-auto rounded-[0.825rem]",
				"bg-meko-blue-transparent-2",
				"p-[0.3rem] transition-transform duration-100",
				!isDisabled && "active:scale-95",
				props?.className
			)}
			disabled={isDisabled}
			{...props}
		>
			<div
				className={cn(
					"rounded-[0.625rem] p-0.5 w-full h-full",
					btnContainerVariant({ variant: currentVariant })
				)}
			>
				<div
					className={cn(
						"rounded-[0.475rem]",
						"w-full h-full",
						"uppercase font-extrabold flex items-center justify-center gap-2",
						props?.innerClassName,
						btnVariant({ variant: currentVariant, size: size })
					)}
				>
					{loading && (
						<Spinner 
							className={cn(
								"w-4 h-4",
								size === "small" ? "w-3 h-3" : "w-4 h-4"
							)} 
						/>
					)}
					<span className={cn(loading && "opacity-90")}>
						{children}
					</span>
				</div>
			</div>
		</button>
	);
}

const btnContainerVariant = cva(
	"text-shadow-[2px_3px_rgba(0_0_0_/_0.25)] cursor-pointer",
	{
		variants: {
			variant: {
				primary:
					"bg-[linear-gradient(180deg,#FFAC7C_0%,rgba(255,255,255,0)_100%)] bg-[#FA4616] group-hover:bg-[#982506]",
				secondary:
					"bg-[linear-gradient(180deg,#7EDAFD_0%,rgba(255,255,255,0)_100%)] bg-[#0040B6]",
				disable:
					"bg-[linear-gradient(180deg,#CBCBCB_0%,rgba(255,255,255,0)_100%)] bg-[#5B5B5B]",
			},
		},
		defaultVariants: {
			variant: "primary",
		},
	}
);

const btnVariant = cva("", {
	variants: {
		variant: {
			primary:
				"bg-[linear-gradient(180deg,_#FF7F32_0%,#FA4616_100%)] group-hover:bg-[linear-gradient(180deg,#FF7F32_0%,#FA4616_41%,#982506_100%)] text-white",
			secondary:
				"bg-[linear-gradient(180deg,#006EB6_0%,#0040B6_100%)] group-hover:bg-[linear-gradient(180deg,#006EB6_0%,#0040B6_41%,#002C7C_100%)] text-white",
			disable:
				"bg-[linear-gradient(180deg,#888888_0%,#5B5B5B_100%)] text-[rgba(255,255,255,0.4)] cursor-not-allowed",
		},
		size: {
			normal: "px-8 py-4 text-base",
			small: "px-5 py-4 text-sm",
		},
	},
	defaultVariants: {
		variant: "primary",
		size: "normal",
	},
});
