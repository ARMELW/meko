import { Label } from "./atoms/typography/label";
import { Input } from "./atoms/forms/input";
import { Typography } from "./atoms/typography/typography";
import { Button } from "./atoms/actions/button";
import { Checkbox } from "./atoms/forms/checkbox";
import { Radio } from "./atoms/forms/radio";
import { Switch } from "./atoms/forms/switch";
import { Status } from "./atoms/view/status";
import { MenuOption } from "./atoms/actions/menu-option";
import { OtpInput } from "./atoms/forms/otp-input";
import { Tag } from "./atoms/actions/tag";
import { Card, CardTitle, CardContent, CardFooter } from "./atoms/view/card";
import { Menu, MenuTitle, MenuContent } from "./atoms/view/menu";
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
} from "./atoms/view/table";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverAnchor,
	PopoverClose,
} from "./atoms/floating/popover";
import {
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogCard,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogContent,
	DialogDescription,
} from "./atoms/floating/dialog";
import { CloseIcon } from "./atoms/icons/close-icon";
import {
	Table1Sample,
	Table2Sample,
	Table3Sample,
	TableSample,
} from "./atoms/view/table-sample";
import { Section, LabeledSection } from "./atoms/view/ui-section";
import { TypographySample } from "./atoms/typography/typography-sample";
import { ButtonSample } from "./atoms/actions/button-sample";
import { InputSample } from "./atoms/forms/input-sample";
import { CheckboxNRadioNSwitchSample } from "./atoms/forms/checkbox-radio-switch-sample";
import { TagSample } from "./atoms/actions/tag-sample";
import { OtpInputSample } from "./atoms/forms/otp-input-sample";
import { StatusSample } from "./atoms/view/status-sample";
import { MenuOptionSample } from "./atoms/actions/menu-option-sample";
import { MenuSample } from "./atoms/view/menu-sample";
import { CardSample } from "./atoms/view/card-sample";
import { PopoverSample } from "./atoms/floating/popover-sample";
import { DialogSample } from "./atoms/floating/dialog-sample";
import { NavItem } from "./atoms/actions/nav-item";

export const Sample = {
	Table: {
		Sample1: Table1Sample,
		Sample2: Table2Sample,
		Sample3: Table3Sample,
		Root: TableSample,
	},
	Typography: TypographySample,
	Button: ButtonSample,
	Input: InputSample,
	CheckboxNRadioNSwitch: CheckboxNRadioNSwitchSample,
	Tag: TagSample,
	OtpInput: OtpInputSample,
	Status: StatusSample,
	MenuOption: MenuOptionSample,
	Menu: MenuSample,
	Card: CardSample,
	Popover: PopoverSample,
	Dialog: DialogSample,
};

export {
	Input,
	Typography,
	Button,
	Label,
	Checkbox,
	Radio,
	Switch,
	Status,
	MenuOption,
	OtpInput,
	Tag,
	Card,
	CardContent,
	CardTitle,
	CardFooter,
	Menu,
	MenuTitle,
	MenuContent,
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	TableFooter,
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverAnchor,
	PopoverClose,
	Dialog,
	DialogPortal,
	DialogOverlay,
	DialogTrigger,
	DialogClose,
	DialogCard,
	DialogHeader,
	DialogFooter,
	DialogTitle,
	DialogContent,
	DialogDescription,
	CloseIcon,
	Section,
	LabeledSection,
	NavItem,
};
