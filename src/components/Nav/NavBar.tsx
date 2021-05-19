import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import logo from "../../img/logo.svg";

type NavLoc = {
  name: string;
  href: string;
  current: boolean;
};

const navigation: NavLoc[] = [
  { name: "Dashboard", href: "#", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function UserMenuItem(props: { active: boolean; text: string }) {
  return (
    <Menu.Item>
      <a
        href="#"
        className={classNames(
          props.active ? "bg-gray-100" : "",
          "block px-4 py-2 text-sm text-gray-700"
        )}
      >
        {props.text}
      </a>
    </Menu.Item>
  );
}

function MobileNavItem(props: { item: NavLoc }) {
  return (
    <a
      key={props.item.name}
      href={props.item.href}
      className={classNames(
        props.item.current
          ? "bg-green-600 text-white font-medium"
          : "hover:bg-gray-500 hover:text-white",
        "block px-3 py-1 rounded-md text-base"
      )}
      aria-current={props.item.current ? "page" : undefined}
    >
      {props.item.name}
    </a>
  );
}

function NavItem(props: { item: NavLoc }) {
  return (
    <a
      key={props.item.name}
      href={props.item.href}
      className={classNames(
        props.item.current
          ? "bg-green-600 text-white"
          : " hover:bg-gray-500 hover:text-white",
        "px-3 py-2 rounded-md text-sm font-medium"
      )}
      aria-current={props.item.current ? "page" : undefined}
    >
      {props.item.name}
    </a>
  );
}

export default function NavBar() {
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-8 w-8 rounded-full" src={logo} alt="" />
                  <span className="hidden lg:block h-8 w-auto text-lg ml-2 text-green-900">
                    resourceee
                  </span>
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <NavItem item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  {({ open }) => (
                    <>
                      <div>
                        <Menu.Button className="flex text-sm rounded-full focus:outline-none text-gray-600">
                          <span className="sr-only">Open user menu</span>
                          <UserCircleIcon
                            className="h-8 w-8"
                            aria-hidden="true"
                          />
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
                          <UserMenuItem active={false} text={"Sign out"} />
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 text-sm">
              {navigation.map((item) => (
                <MobileNavItem item={item} />
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
