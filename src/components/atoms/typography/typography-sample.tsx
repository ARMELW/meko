import { LabeledSection } from "../view/ui-section";
import { Typography } from "./typography";

export function TypographySample() {
	return (
		<div className="grid gap-4">
			{typographyData.map((item) => (
				<LabeledSection label={item.id} key={`t-${item.id}`}>
					<Typography
						key={`t-${item.id}`}
						as={item.as}
						className={item.className}
					>
						{item.text}
					</Typography>
				</LabeledSection>
			))}
		</div>
	);
}

const typographyData = [
	{ id: "H1", as: "h1" as const, text: "Apprendre les maths en s'amusant !" },
	{ id: "H2", as: "h2" as const, text: "Création compte parent" },
	{ id: "H3", as: "h3" as const, text: "Abonnement en cours" },
	{
		id: "Paragraph",
		as: "p" as const,
		text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere natus accusamus laborum maxime, excepturi fugit illo amet! Sunt officiis accusamus, cumque dolorem molestiae suscipit recusandae rem tempore totam a! Commodi?",
		className: "max-w-2xl",
	},
];
