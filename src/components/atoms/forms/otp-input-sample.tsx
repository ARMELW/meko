import { LabeledSection } from "../view/ui-section";
import { OtpInput } from "./otp-input";

export function OtpInputSample() {
	return (
		<div className="grid grid-cols-8">
			<LabeledSection label="OTP">
				<OtpInput />
			</LabeledSection>
			<LabeledSection label="OTP + value">
				<OtpInput value="2" onChange={() => {}} />
			</LabeledSection>
			<LabeledSection label="OTP + value + error">
				<OtpInput value="2" error onChange={() => {}} />
			</LabeledSection>
			<LabeledSection label="OTP + disabled">
				<OtpInput disabled />
			</LabeledSection>
		</div>
	);
}
