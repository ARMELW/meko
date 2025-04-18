import { cva, VariantProps } from "class-variance-authority";

export type TypoVariantProps = VariantProps<typeof typographyVariant>;

export const typographyVariant = cva("", {
	variants: {
		variant: {
			h1: "text-h1",
			h2: "text-3xl font-extrabold uppercase",
			h3: "text-xl font-extrabold uppercase",
			p: "text-base",
			span: "text-base",
		},
		align: {
			left: "text-left",
			center: "text-center",
			right: "text-right",
			justify: "text-justify",
		},
		color: {
			default: "text-white",
			primary: "text-meko-blue-light-1",
			secondary: "text-secondary",
			error: "text-destructive",
		},
		shadow: {
			none: "text-shadow-none",
			sm: "text-shadow-[2px_3px_rgba(0_0_0_/_0.25)]",
		},
		weight: {
			default: "font-normal",
			bold: "font-black",
		},
		styleCase: {
			default: "normal-case",
			uppercase: "uppercase",
		},
	},
	defaultVariants: {
		variant: "p",
		align: "left",
		color: "default",
		shadow: "none",
		weight: "default",
		styleCase: "default"
	},
});