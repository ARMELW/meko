import { useState } from "react";
import { Label } from "../typography/label";
import { Typography } from "../typography/typography";
import { LabeledSection } from "../view/ui-section";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { Switch } from "./switch";

export function CheckboxNRadioNSwitchSample() {
	const [v, setV] = useState(false);
	return (
		<div className="grid grid-cols-6 gap-12">
			<LabeledSection label="Radio">
				<Radio
					name="myOptions"
					value="option1"
					checked={v}
					onChange={(e) => setV(e.target.checked)}
					aria-label="Option 1" // Essential for accessibility
				/>
			</LabeledSection>
			<LabeledSection label="Checkbox">
				<Checkbox aria-label="test" />
			</LabeledSection>
			<LabeledSection label="Checkbox + label">
				<Label>
					<Checkbox aria-label="test" />
					<Typography className="">Checkbox label</Typography>
				</Label>
			</LabeledSection>
			<LabeledSection label="Switch">
				<Switch aria-label="switch" />
			</LabeledSection>
		</div>
	);
}
