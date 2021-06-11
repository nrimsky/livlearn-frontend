import React from "react";
import { Disclosure } from "@headlessui/react";
import MenuAction from "../../types/MenuAction";
import logo from "../../img/logo.svg";
import MobileMenuButton from "./MobileMenuButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { signOut } from "../../firebase/AuthService";
import { useHistory } from "react-router-dom";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { UserCircleIcon } from "@heroicons/react/solid";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import SmallOutlineButton from "../Button/SmallOutlineButton";

export default function NavBar(props: { loggedIn: boolean }) {
  const history = useHistory();

  const navigationLoggedInActions: MenuAction[] = [
    {
      name: "Home",
      action: () => {
        history.push("/");
      },
    },
    {
      name: "Your collections",
      action: () => {
        history.push("/u");
      },
    },
    {
      name: "New collection",
      action: () => {
        history.push("/list");
      },
    },
  ];

  const navigationLoggedOutActions: MenuAction[] = [
    {
      name: "Home",
      action: () => {
        history.push("/");
      },
    },
    // {
    //   name: "Login",
    //   action: () => {
    //     history.push("/auth");
    //   },
    // },
  ];

  const userMenuActions: MenuAction[] = [
    {
      name: "Sign out",
      action: () => {
        signOut();
        history.push("/");
      },
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow z-10">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 relative">
            <div className="relative flex items-center justify-between h-14">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 focus:outline-none">
                  <MobileMenuButton open={open} />
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src={logo}
                    alt=""
                    onClick={() => history.push("/")}
                  />
                </div>
                <div className="hidden sm:block sm:ml-8">
                  <DesktopNav
                    navigation={
                      props.loggedIn
                        ? navigationLoggedInActions
                        : navigationLoggedOutActions
                    }
                  />
                </div>
              </div>
              {props.loggedIn ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <DropdownMenu
                    icon={<UserCircleIcon className="h-8 w-8" />}
                    aria-hidden="true"
                    name={"Open user menu"}
                  >
                    {userMenuActions.map((a, i) => (
                      <DropdownMenuItem menuAction={a} key={i} />
                    ))}
                  </DropdownMenu>
                </div>
              ) : (
                <SmallOutlineButton
                  className="border-green-500 text-green-500 tracking-tighter"
                  text="LOGIN"
                  onClick={() => history.push("/auth")}
                />
              )}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <MobileNav
              navigation={
                props.loggedIn
                  ? navigationLoggedInActions
                  : navigationLoggedOutActions
              }
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
