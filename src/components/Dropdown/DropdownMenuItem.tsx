import { Menu } from "@headlessui/react";
import classNames from "../../helpers/Helpers";
import MenuAction from "../../types/MenuAction";

export default function DropdownMenuItem(props: {
  menuAction: MenuAction;
  key?: number;
  icon?: React.ReactNode;
}) {
  return (
    <Menu.Item onClick={props.menuAction.action}>
      <button
        className={classNames(
          "group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-700 focus:outline-none",
          props.menuAction.name.toLowerCase().includes("delete")
            ? "hover:bg-red-500 hover:text-white"
            : "hover:bg-green-500 hover:text-white"
        )}
      >
        {props.icon}
        {props.menuAction.name}
      </button>
    </Menu.Item>
  );
}
