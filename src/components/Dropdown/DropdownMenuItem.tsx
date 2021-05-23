import { Menu } from "@headlessui/react";
import MenuAction from "../../types/MenuAction";

export default function DropdownMenuItem(props: {
  menuAction: MenuAction;
  key?: number;
}) {
  return (
    <Menu.Item onClick={props.menuAction.action}>
      <span className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 cursor-pointer">
        {props.menuAction.name}
      </span>
    </Menu.Item>
  );
}
