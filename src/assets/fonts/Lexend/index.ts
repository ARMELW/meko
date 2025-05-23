import LexendBlack from "./static/Lexend-Black.ttf";
import LexendBold from "./static/Lexend-Bold.ttf";
import LexendExtraBold from "./static/Lexend-ExtraBold.ttf";
import LexendExtraLight from "./static/Lexend-ExtraLight.ttf";
import LexendLight from "./static/Lexend-Light.ttf";
import LexendMedium from "./static/Lexend-Medium.ttf";
import LexendRegular from "./static/Lexend-Regular.ttf";
import LexendSemiBold from "./static/Lexend-SemiBold.ttf";
import LexendThin from "./static/Lexend-Thin.ttf";
type FontData = {
	name: string;
	path: string;
	options: {
		style: string;
		weight: string;
		display: string;
	};
}
export const lexendFont: FontData[] = [
	{
		name: "Lexend",
		path: LexendBlack,
		options: {
			style: "normal",
			weight: "900",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendExtraBold,
		options: {
			style: "normal",
			weight: "800",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendBold,
		options: {
			style: "normal",
			weight: "700",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendSemiBold,
		options: {
			style: "normal",
			weight: "600",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendMedium,
		options: {
			style: "normal",
			weight: "500",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendRegular,
		options: {
			style: "normal",
			weight: "400",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendLight,
		options: {
			style: "normal",
			weight: "300",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendExtraLight,
		options: {
			style: "normal",
			weight: "200",
			display: "swap",
		},
	},
	{
		name: "Lexend",
		path: LexendThin,
		options: {
			style: "normal",
			weight: "100",
			display: "swap",
		},
	},
];
