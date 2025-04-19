import { Sample } from "@/components";
import { Button } from "../actions/button";
import {
	Dialog,
	DialogCard,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./dialog";

export function DialogSample() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="small">Open dialog</Button>
			</DialogTrigger>
			<DialogCard className="max-w-[600px]">
				<DialogHeader>
					<DialogTitle title="Dernière activité" />
				</DialogHeader>
				<DialogContent>
					<div className="">
						<Sample.Table.Sample3 />
						<div className="w-full pt-8 flex justify-center items-center">
							<DialogClose asChild>
								<Button type="button" size="small" variant="primary">
									Relancer
								</Button>
							</DialogClose>
						</div>
					</div>
				</DialogContent>
			</DialogCard>
		</Dialog>
	);
}
