import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { typographyVariant, TypoVariantProps } from "./typography-variant";
import { useMemo } from "react";

interface Props extends Omit<ComponentProps<"p">, "color">, TypoVariantProps {
	children: ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3" | "p" | "span";
	label?: string;
}

export function Typography({
	as = "span",
	variant,
	children,
	className,
	align,
	color,
	shadow,
	styleCase,
	weight,
	label,
	...props
}: Props) {
	const Component = as;
	const _styleCase = useMemo(() => {
		if (["h2", "h3"].find((a) => a === as)) {
			return "uppercase";
		}
		return styleCase;
	}, [as, styleCase]);
	const _weight = useMemo(() => {
		if (["h1", "h2", "h3"].find((a) => a === as)) {
			return "bold";
		}
		return weight;
	}, [as, weight]);
	const _shadow = useMemo(() => {
		if (["h1", "h2", "h3"].find((a) => a === as)) {
			return "sm";
		}
		return shadow;
	}, [as, shadow]);
	const _variant = useMemo(() => {
		if (["small", "p4"].find((v) => v === variant)) {
			return variant;
		}
		return as;
	}, [as, variant]);

	return (
		<Component
			className={clsx(
				className,
				typographyVariant({

					variant: _variant,
					align,
					color,
					shadow: _shadow,
					weight: _weight,
					styleCase: _styleCase,
				})
			)}
			aria-label={label}
			{...props}
		>
			{children}
		</Component>
	);
}
