import {
	Button,
	Checkbox,
	Input,
	Label,
	Typography,
	Radio,
} from "@/components";
import { Tag } from "@/components/atoms/actions/tag";
import { PropsWithChildren, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";

export function UiPage() {
	const [v, setV] = useState(false);
	const { t, i18n } = useTranslation();
	const toggleLang = () => {
		i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
	};

	return (
		<div className="w-full container mx-auto px-12 py-20 grid gap-12">
			<div className="flex items-center justify-between">
				<Typography as="h1">{t("ui.title")}</Typography>
				<div className="">
					<Button size="small" variant="secondary" onClick={toggleLang}>
						switch language : {i18n.language}
					</Button>
				</div>
			</div>
			<Section title="Typography">
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
			</Section>
			<Section title="Button">
				<div className="max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{btnData.map((btn) => (
						<LabeledSection label={btn.id} key={`b-${btn.id}`}>
							<Button variant={btn.variant} size={btn.size}>
								{btn.label}
							</Button>
						</LabeledSection>
					))}
				</div>
			</Section>
			<Section title="Input">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
			</Section>
			<Section title="Checkbox & Radio">
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
				</div>
			</Section>
			<Section title="Switch">
				<div className=""></div>
			</Section>
			<Section title="Tag">
				<div className="grid grid-cols-2 lg:grid-cols-4">
					<LabeledSection label="tag">
						<Tag>
							<Typography weight="bold" as="p" styleCase="uppercase">
								Les 7 derniers jours
							</Typography>
						</Tag>
					</LabeledSection>
					<LabeledSection label="tag selected">
						<Tag selected>
							<Typography weight="bold" as="p" styleCase="uppercase">
								Les 7 derniers jours
							</Typography>
						</Tag>
					</LabeledSection>
				</div>
			</Section>
		</div>
	);
}

function Section({ title, children }: { title: string; children: ReactNode }) {
	return (
		<div className="grid grid-cols-6 lg:grid-cols-12">
			<div className="col-span-2 mb-12">
				<Typography as="h3">{title}</Typography>
			</div>
			<div className="col-span-10">{children}</div>
		</div>
	);
}

function LabeledSection({
	label,
	children,
}: PropsWithChildren<{ label: string }>) {
	return (
		<div className="relative my-4 group">
			<div className="opacity-20 group-hover:opacity-100 absolute -top-8 left-0 text-stone-200 underline">
				{label}
			</div>
			{children}
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
