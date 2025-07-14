import { cn } from "@/utils/style";
import { Typography } from "../typography/typography";
import {
	statusLabel,
	StatusVariantProps,
	statusVariants,
} from "./status-variant";
import { useTranslation } from "react-i18next";

interface Props extends StatusVariantProps {
	className?: string;
}

export function Status({ size, status, className }: Props) {
	const { t } = useTranslation();

	// Traductions des statuts
	const getTranslatedLabel = (statusKey: string) => {
		switch (statusKey) {
			case 'completed':
				return t('modules.detail.gameStatus.completed', 'TERMINÉ');
			case 'blocked':
				return t('modules.detail.gameStatus.blocked', 'BLOQUÉ');
			case 'inProgress':
				return t('modules.detail.gameStatus.in_progress', 'EN COURS');
			case 'toDiscover':
				return t('modules.detail.gameStatus.available', 'À DÉCOUVRIR');
			default:
				return statusLabel[status || "completed"];
		}
	};

	return (
		<div className={cn(statusVariants({ size, status }), className)}>
			<Typography
				styleCase="uppercase"
				weight="bold"
				variant={size === "small" ? "small" : "span"}
			>
				{getTranslatedLabel(status || "completed")}
			</Typography>
		</div>
	);
}
