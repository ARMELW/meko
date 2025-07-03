import { Typography } from "../typography/typography";

interface Props {
	icon?: React.ReactNode;
	label: string;
	onClick?: () => void;
}

export function NavItem({ label, icon, onClick }: Props) {
	return (
		<div 
			className="relative cursor-pointer inline-flex items-center bg-meko-blue-transparent-2 rounded-xl px-3.5 py-1.5 hover:bg-meko-blue-transparent-1 transition-colors"
			onClick={onClick}
		>
			<div className="absolute left-2 top-1 right-0">{icon}</div>
			<div className="pl-8">
				<Typography
					weight="bold"
					variant="small"
					styleCase="uppercase"
					className="text-meko-blue-light-3"
				>
					{label}
				</Typography>
			</div>
		</div>
	);
}
