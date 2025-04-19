import { Card, CardContent, CardTitle } from "./card";
import { LabeledSection } from "./ui-section";

export function CardSample() {
	return (
		<div className="grid grid-cols-2 gap-8">
			<LabeledSection label="Card">
				<Card>
					<CardContent className="h-[400px]"></CardContent>
				</Card>
			</LabeledSection>
			<LabeledSection label="Card + CardTitle">
				<Card>
					<CardTitle title="Titre de la card" />
					<CardContent className="h-[400px]"></CardContent>
				</Card>
			</LabeledSection>
		</div>
	);
}
