import React, { useContext } from "react";
import { Disclosure } from "@headlessui/react";
import MenuAction from "../../types/MenuAction";
import logo from "../../img/logo.svg";
import MobileMenuButton from "./MobileMenuButton";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { getCurrentUserId, signOut } from "../../firebase/AuthService";
import { useHistory } from "react-router-dom";
import DropdownMenu from "../Dropdown/DropdownMenu";
import { UserCircleIcon } from "@heroicons/react/solid";
import DropdownMenuItem from "../Dropdown/DropdownMenuItem";
import SmallOutlineButton from "../Button/SmallOutlineButton";
import { ThemeContext } from "../../App";


export default function NavBar(props: { loggedIn: boolean}) {
  const { mode, onChange }  = useContext(ThemeContext);
  const history = useHistory();
  const id = getCurrentUserId();

  const navigationLoggedInActions: MenuAction[] = [
    {
      name: "Home",
      action: () => {
        history.push("/");
      },
    },
    {
      name: "Collections",
      action: () => {
        history.push("/u");
      },
    }
  ];

  const navigationLoggedOutActions: MenuAction[] = [
    {
      name: "Home",
      action: () => {
        history.push("/");
      },
    }
  ];

  const userMenuActions: MenuAction[] = [
    {
      name: "Learner profile",
      action: () => {
        history.push(`/profile/${id ?? ""}`);
      },
    },
    {
      name: "New collection",
      action: () => {
        history.push("/list");
      },
    },
    {
      name: "Sign out",
      action: () => {
        signOut();
        history.push("/");
      },
    },
  ];

  const toggleDarkModeButton = (
    <button
      className="mr-2 sm:mr-3"
      name="toggle dark mode"
      id="dark-mode-button"
      onClick={() => onChange((mode === "dark") ? "light" : "dark")}
    >
      {(mode === "dark") ? "🌙" : "🌞"}
    </button>
  );

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900 shadow z-10">
      {({ open }) => (
        <>
          <div className="mx-auto px-2 sm:px-6 lg:px-8 relative">
            <div className="relative flex items-center justify-between h-14">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-500  dark:text-gray-400 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50">
                  <MobileMenuButton open={open} />
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="hidden sm:flex flex-shrink-0 items-center">
                  <img
                    className="h-10 w-10 rounded-full cursor-pointer"
                    src={logo}
                    alt=""
                    onClick={() => history.push("/")}
                  />
                </div>
                <div
                  className="sm:hidden"
                  style={{ position: "absolute", left: "50%", top: "8px" }}
                >
                  <img
                    style={{ position: "relative", left: "-50%" }}
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
                  {toggleDarkModeButton}
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
                <>
                  {toggleDarkModeButton}
                  <SmallOutlineButton
                    className="border-green-500 text-green-500 tracking-tighter"
                    text="LOGIN"
                    onClick={() => history.push("/auth")}
                  />
                </>
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
