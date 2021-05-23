import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import MenuAction from "../../types/MenuAction";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";

export default function DropdownMenu(props: {
  menuActions: MenuAction[];
  icon: React.ReactNode;
  name: string;
}) {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none text-gray-600">
              <span className="sr-only">{props.name}</span>
              {props.icon}
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              {props.menuActions.map((a, i) => (
                <DropdownMenuItem menuAction={a} key={i} />
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
