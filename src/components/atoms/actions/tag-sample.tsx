import { LabeledSection } from "../view/ui-section";
import { Tag } from "./tag";

export function TagSample() {
	return (
		<div className="grid grid-cols-2 xl:grid-cols-4">
			<LabeledSection label="tag">
				<Tag label="Les 7 derniers jours" />
			</LabeledSection>
			<LabeledSection label="tag selected">
				<Tag selected label="Les 7 derniers jours" />
			</LabeledSection>
		</div>
	);
}
