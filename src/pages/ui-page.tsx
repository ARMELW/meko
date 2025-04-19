import {
	LessonCard,
	LessonCardAction,
	LessonCardContent,
	LessonCardImage,
} from "@/app/lesson";
import { ModuleCard } from "@/app/modules";
import {
	Button,
	Typography,
	Sample,
	Section,
	Status,
	NavItem,
} from "@/components";
import { LastActivityIcon } from "@/components/atoms/icons/last-activity-icon";
import { useTranslation } from "react-i18next";

export function UiPage() {
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
				<Sample.Typography />
			</Section>
			<Section title="Button">
				<Sample.Button />
			</Section>
			<Section title="Input">
				<Sample.Input />
			</Section>
			<Section title="Checkbox & Radio & Switch">
				<Sample.CheckboxNRadioNSwitch />
			</Section>
			<Section title="Nav Item">
				<div className="">
					<NavItem label="Last activity" icon={<LastActivityIcon />} />
				</div>
			</Section>
			<Section title="Tag">
				<Sample.Tag />
			</Section>
			<Section title="Otp Input">
				<Sample.OtpInput />
			</Section>
			<Section title="Status">
				<Sample.Status />
			</Section>
			<Section title="Menu-Option">
				<Sample.MenuOption />
			</Section>
			<Section title="Menu">
				<Sample.Menu />
			</Section>
			<Section title="Card">
				<Sample.Card />
			</Section>
			<Section title="Table">
				<Sample.Table.Root />
			</Section>
			<Section title="Popover + menu">
				<Sample.Popover />
			</Section>
			<Section title="Dialog">
				<Sample.Dialog />
			</Section>
			<Section title="module card">
				<div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<ModuleCard
						src="https://picsum.photos/200"
						altSrc="Avatar"
						title="Les maitres des additions"
						status="completed"
					/>
					<ModuleCard
						src="https://picsum.photos/200"
						altSrc="Avatar"
						title="Les maitres des additions"
						status="inProgress"
						progress="2/5"
					/>
					<ModuleCard
						src="https://picsum.photos/200"
						altSrc="Avatar"
						title="Les maitres des additions"
						status="toDiscover"
					/>
					<ModuleCard
						src="https://picsum.photos/200"
						altSrc="Avatar"
						title="Les maitres des additions"
						status="blocked"
					/>
				</div>
			</Section>
			<Section title="lesson card">
				<div className="">
					<LessonCard>
						<LessonCardImage
							src="https://picsum.photos/200"
							alt="avatar perso"
						/>
						<LessonCardContent className="h-[149px] ">
							<div className="mb-2.5">
								<Typography
									weight="bold"
									variant="p4"
									styleCase="uppercase"
								>
									Addition Express
								</Typography>
							</div>
							<Status status="completed" size="small" />
							<div className="pt-2">
								<div>
									<Typography color="primary">Module :</Typography>
									<Typography>Les maitres des additions</Typography>
								</div>
								<div>
									<Typography color="primary">Leçon :</Typography>
									<Typography>1</Typography>
								</div>
							</div>
						</LessonCardContent>
						<LessonCardAction className=" ">
							<Button size="small" color="secondary">
								Lancer
							</Button>
						</LessonCardAction>
					</LessonCard>
				</div>
			</Section>
			<div className="h-[40vh]"></div>
		</div>
	);
}
