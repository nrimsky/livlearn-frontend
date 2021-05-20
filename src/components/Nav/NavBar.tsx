import React from "react";
import { Disclosure } from "@headlessui/react";
import NavLoc from "../../types/NavLoc";
import MenuAction from "../../types/MenuAction";
import logo from "../../img/logo.svg";
import MobileMenuButton from "./MobileMenuButton";
import DesktopNav from "./DesktopNav";
import ProfileDropdown from "./ProfileDropdown";
import MobileNav from "./MobileNav";
import firebase from "firebase/app";
import "firebase/auth";


export default function NavBar(props: { loggedIn: boolean }) {
  const navigationLoggedIn: NavLoc[] = [
    { name: "Home", href: "/" },
    { name: "My Lists", href: "/" },
    { name: "New", href: "/new" },
  ];

  const navigationLoggedOut: NavLoc[] = [
    { name: "Home", href: "/" },
    { name: "New", href: "/new" },
    { name: "Login", href: "/auth" },
  ];

  const userMenuActions: MenuAction[] = [
    { name: "Sign out", action: () => firebase.auth().signOut() },
  ];

  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <MobileMenuButton open={open} />
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-10 w-10 rounded-full" src={logo} alt="" />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <DesktopNav
                    navigation={
                      props.loggedIn ? navigationLoggedIn : navigationLoggedOut
                    }
                  />
                </div>
              </div>
              {props.loggedIn && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <ProfileDropdown menuActions={userMenuActions} />
                </div>
              )}
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <MobileNav
              navigation={
                props.loggedIn ? navigationLoggedIn : navigationLoggedOut
              }
            />
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
