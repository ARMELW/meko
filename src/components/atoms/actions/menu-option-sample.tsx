import { LabeledSection } from "../view/ui-section";
import { MenuOption } from "./menu-option";

export function MenuOptionSample() {
	return (
		<div className="grid grid-cols-3 gap-8">
			<LabeledSection label="Menu-Option">
				<MenuOption label="Menu label" />
			</LabeledSection>
			<LabeledSection label="Menu-Option + selected">
				<MenuOption label="Menu label" selected />
			</LabeledSection>
		</div>
	);
}
