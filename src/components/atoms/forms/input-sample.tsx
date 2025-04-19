import { Label } from "../typography/label";
import { LabeledSection } from "../view/ui-section";
import { Input } from "./input";

export function InputSample() {
	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
			{(["normal", "small"] as const).map((size, index) =>
				[true, false].map((showLabel, lindex) =>
					[
						{ placeholder: "placeholder", error: false },
						{ placeholder: "", error: false },
						{ placeholder: "", error: true },
					].map((p, jindex) => (
						<LabeledSection
							label={`${size}-${showLabel && "show label"} ${
								p.placeholder
							} ${p.error && "error"}`}
							key={`input-${index}-${lindex}-${jindex}`}
						>
							{showLabel && <Label uppercase>Identifiant</Label>}
							<Input
								size={size}
								placeholder={p.placeholder}
								error={p.error}
							/>
						</LabeledSection>
					))
				)
			)}
		</div>
	);
}
