import { MenuOption } from "../actions/menu-option";
import { Menu, MenuContent, MenuTitle } from "./menu";
import { LabeledSection } from "./ui-section";

export function MenuSample() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			<LabeledSection label="Menu">
				<Menu>
					<MenuContent className="h-[100px]"></MenuContent>
				</Menu>
			</LabeledSection>
			<LabeledSection label="Menu + title">
				<Menu>
					<MenuTitle title="Titre de la Menu" />
					<MenuContent className="h-[100px]"></MenuContent>
				</Menu>
			</LabeledSection>
			<LabeledSection label="Menu + title + options">
				<Menu>
					<MenuTitle title="Titre de la Menu" />
					<MenuContent>
						<MenuOption label="Option 1" />
						<MenuOption label="Option 2" />
						<MenuOption label="Option 3" />
						<MenuOption label="Option 4" />
					</MenuContent>
				</Menu>
			</LabeledSection>
		</div>
	);
}
