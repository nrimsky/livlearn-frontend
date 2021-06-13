import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

export default function DropdownMenu(props: {
  icon: React.ReactNode;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Menu as="div" className="ml-3 relative z-50">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="flex rounded-full focus:outline-none text-gray-500 dark:text-gray-400">
              <span className="sr-only">{props.name}</span>{props.icon}
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
              as="div"
              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg p-1 bg-white dark:bg-gray-900 focus:outline-none border border-gray-300 dark:border-gray-600 focus:ring focus:ring-green-200 focus:ring-opacity-50 ring-inset"
            >
              {props.children}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
