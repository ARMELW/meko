import { LabeledSection } from "../view/ui-section";
import { Button } from "./button";

export function ButtonSample() {
	return (
		<div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{btnData.map((btn) => (
				<LabeledSection label={btn.id} key={`b-${btn.id}`}>
					<Button variant={btn.variant} size={btn.size}>
						{btn.label}
					</Button>
				</LabeledSection>
			))}
		</div>
	);
}

const btnData = [
	{
		id: "primary normal",
		variant: "primary" as const,
		size: "normal" as const,
		label: "Essai gratuit de 7 jours",
	},
	{
		id: "secondary normal",
		variant: "secondary" as const,
		size: "normal" as const,
		label: "Essai gratuit de 7 jours",
	},
	{
		id: "disable normal",
		variant: "disable" as const,
		size: "normal" as const,
		label: "Essai gratuit de 7 jours",
	},
	{
		id: "primary small",
		variant: "primary" as const,
		size: "small" as const,
		label: "Essai gratuit de 7 jours",
	},
	{
		id: "secondary small",
		variant: "secondary" as const,
		size: "small" as const,
		label: "Essai gratuit de 7 jours",
	},
	{
		id: "disable small",
		variant: "disable" as const,
		size: "small" as const,
		label: "Essai gratuit de 7 jours",
	},
];
