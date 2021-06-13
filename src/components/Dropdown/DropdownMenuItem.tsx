import { Menu } from "@headlessui/react";
import classNames from "../../helpers/classNames";
import MenuAction from "../../types/MenuAction";

export default function DropdownMenuItem(props: {
  menuAction: MenuAction;
  key?: number;
  icon?: React.ReactNode;
}) {
  return (
    <Menu.Item onClick={props.menuAction.action} as="div">
      <button
        className={classNames(
          "group flex rounded items-center w-full px-2 py-2 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50",
          props.menuAction.name.toLowerCase().includes("delete")
            ? "hover:bg-red-500 hover:text-white dark:hover:bg-red-600"
            : "hover:bg-green-500 hover:text-white dark:hover:bg-green-700"
        )}
      >
        {props.icon}
        {props.menuAction.name}
      </button>
    </Menu.Item>
  );
}
