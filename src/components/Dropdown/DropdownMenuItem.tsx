import { Menu } from "@headlessui/react";
import MenuAction from "../../types/MenuAction";

export default function DropdownMenuItem(props: {
  menuAction: MenuAction;
  key?: number;
  icon?: React.ReactNode;
}) {
  const isDeleteButton = props.menuAction.name.toLowerCase().includes("delete");
  if (isDeleteButton) {
    return (
      <Menu.Item onClick={props.menuAction.action} as="div">
        {({ active }) => (
          <button
            className={`${
              active ? "bg-red-500 text-white" : "bg-white dark:bg-gray-900 text-red-500"
            } text-white group flex rounded items-center w-full px-2 py-1 focus:outline-none text-sm font-medium my-1`}
          >
            {props.icon}{props.menuAction.name}
          </button>
        )}
      </Menu.Item>
    );
  }
  return (
    <Menu.Item onClick={props.menuAction.action} as="div">
      {({ active }) => (
        <button
          className={`${
            active
              ? "bg-green-100 dark:bg-gray-800"
              : "bg-white dark:bg-gray-900"
          } group flex rounded items-center w-full px-2 py-1 focus:outline-none text-sm font-medium my-1 text-gray-900 dark:text-white`}
        >
          {props.icon}{props.menuAction.name}
        </button>
      )}
    </Menu.Item>
  );
}
