import { Typography } from "../typography/typography";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./table";
import { LabeledSection } from "./ui-section";

export function Table1Sample() {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">Invoice</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{invoices.map((invoice) => (
					<TableRow key={invoice.invoice}>
						<TableCell className="font-medium">
							{invoice.invoice}
						</TableCell>
						<TableCell>{invoice.paymentStatus}</TableCell>
						<TableCell>{invoice.paymentMethod}</TableCell>
						<TableCell className="text-right">
							{invoice.totalAmount}
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

export function Table2Sample() {
	return (
		<Table className="w-full">
			<TableHeader>
				<TableRow>
					<TableHead></TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Method</TableHead>
					<TableHead>Test</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				<TableRow>
					<TableCell>
						<div className="flex items-center gap-4">
							{/* fake image to real url */}
							<img
								src="https://i.pravatar.cc/300"
								alt="Avatar"
								className="w-20 h-20 rounded-2xl"
							/>
							<Typography
								color="primary"
								weight="bold"
								styleCase="uppercase"
							>
								Les maitres des additions
							</Typography>
						</div>
					</TableCell>
					<TableCell className="min-w-[100px]">3</TableCell>
					<TableCell className="min-w-[100px]">2</TableCell>
					<TableCell className="min-w-[100px]">5</TableCell>
					<TableCell className="min-w-[100px]">53.5.%</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

export function Table3Sample() {
	return (
		<Table>
			<TableBody>
				<TableRow>
					<TableCell styleCase="uppercase" color="primary" align="left">
						Module
					</TableCell>
					<TableCell weight="default" align="right">
						Les maitres des additions
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell styleCase="uppercase" color="primary" align="left">
						Leçon
					</TableCell>
					<TableCell weight="default" align="right">
						2
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell styleCase="uppercase" color="primary" align="left">
						Durée de jeu
					</TableCell>
					<TableCell weight="default" align="right">
						12 minutes
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}

export function TableSample() {
	return (
		<div className="w-full grid gap-12">
			<LabeledSection label="Table Sample1">
				<Table1Sample />
			</LabeledSection>
			<LabeledSection label="Table Sample2">
				<Table2Sample />
			</LabeledSection>
			<LabeledSection label="Table Sample3">
				<Table3Sample />
			</LabeledSection>
		</div>
	);
}

const invoices = [
	{
		invoice: "INV001",
		paymentStatus: "Paid",
		totalAmount: "$250.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV002",
		paymentStatus: "Pending",
		totalAmount: "$150.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV003",
		paymentStatus: "Unpaid",
		totalAmount: "$350.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV004",
		paymentStatus: "Paid",
		totalAmount: "$450.00",
		paymentMethod: "Credit Card",
	},
	{
		invoice: "INV005",
		paymentStatus: "Paid",
		totalAmount: "$550.00",
		paymentMethod: "PayPal",
	},
	{
		invoice: "INV006",
		paymentStatus: "Pending",
		totalAmount: "$200.00",
		paymentMethod: "Bank Transfer",
	},
	{
		invoice: "INV007",
		paymentStatus: "Unpaid",
		totalAmount: "$300.00",
		paymentMethod: "Credit Card",
	},
];
