import { Typography } from "../typography/typography";

interface Props {
	icon?: React.ReactNode;
	label: string;
}

export function NavItem({ label, icon }: Props) {
	return (
		<div className="relative cursor-pointer inline-flex items-center bg-meko-blue-transparent-2 rounded-xl px-3.5 py-1.5">
			<div className="absolute left-[-15px] top-0 right-0">{icon}</div>
			<div className="pl-4">
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
