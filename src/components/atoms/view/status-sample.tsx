import { Status } from "./status";
import { statusLabel } from "./status-variant";
import { LabeledSection } from "./ui-section";

export function StatusSample() {
	return (["small", "normal"] as const).map((size) => (
		<div className="flex items-center gap-12 mb-8" key={`status-${size}`}>
			{Object.keys(statusLabel).map((status) => (
				<LabeledSection
					label={`${status} ${size}`}
					key={`status-${status}`}
				>
					<Status
						status={status as keyof typeof statusLabel}
						size={size}
					/>
				</LabeledSection>
			))}
		</div>
	));
}
