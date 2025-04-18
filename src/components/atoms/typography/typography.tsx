import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";
import { typographyVariant, TypoVariantProps } from "./typography-variant";
import { useMemo } from "react";

interface Props extends Omit<ComponentProps<"p">, "color">, TypoVariantProps {
	children: ReactNode;
	className?: string;
	as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function Typography({
	as = "p",
	children,
	className,
	align,
	color,
	shadow,
	styleCase,
	weight,
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

	return (
		<Component
			className={clsx(
				className,
				typographyVariant({
					variant: as,
					align,
					color,
					shadow: _shadow,
					weight: _weight,
					styleCase: _styleCase,
				})
			)}
		>
			{children}
		</Component>
	);
}
