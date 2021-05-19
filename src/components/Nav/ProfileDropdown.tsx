import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { UserCircleIcon } from "@heroicons/react/solid";
import MenuAction from "../../types/MenuAction";
import UserMenuItem from "./UserMenuItem";

export default function ProfileDropdown(props: { menuActions: MenuAction[] }) {
  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex text-sm rounded-full focus:outline-none text-gray-600">
              <span className="sr-only">Open user menu</span>
              <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
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
                <UserMenuItem menuAction={a} key={i} />
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
