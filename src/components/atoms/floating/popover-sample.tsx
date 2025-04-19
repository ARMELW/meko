import { Button } from "../actions/button";
import { MenuOption } from "../actions/menu-option";
import { Menu, MenuTitle, MenuContent } from "../view/menu";
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "./popover";

export function PopoverSample() {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button size="small">Open menu</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className="w-80">
				<Menu>
					<MenuTitle title="Titre de la Menu" />
					<MenuContent>
						<PopoverClose asChild>
							<MenuOption
								label="Option 1"
								onClick={() => console.log("Option 1")}
							/>
						</PopoverClose>
						<PopoverClose asChild>
							<MenuOption
								label="Option 2"
								onClick={() => console.log("Option 2")}
							/>
						</PopoverClose>
						<PopoverClose asChild>
							<MenuOption
								label="Option 3"
								onClick={() => console.log("Option 3")}
							/>
						</PopoverClose>
						<PopoverClose asChild>
							<MenuOption
								label="Option 4"
								onClick={() => console.log("Option 4")}
							/>
						</PopoverClose>
					</MenuContent>
				</Menu>
			</PopoverContent>
		</Popover>
	);
}
