import { Level } from "../../types/ResourceRec";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { Fragment } from "react";
import classNames from "../../helpers/classNames";

const LevelMenuItem: React.FC<{
  selected: Level;
  onSelect: (level: Level) => void;
  value: Level;
}> = ({ selected, onSelect, value }) => {
  const onChangePress = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value !== selected) {
      onSelect(value);
    }
  };
  return (
    <Menu.Item>
      <button
        onClick={onChangePress}
        className="group flex rounded-md items-center w-full px-1 pt-1 focus:outline-none"
      >
        <span
          className={classNames(
            "font-medium hover:bg-green-500 hover:text-white px-2 py-1 rounded w-full text-left",
            value === selected
              ? "bg-green-500 text-white"
              : "bg-white text-gray-900"
          )}
        >
          {toStr(value)}
        </span>
      </button>
    </Menu.Item>
  );
};

const toStr = (level: Level) => {
  switch (level) {
    case "AN":
      return "Any level";
    case "AD":
      return "Advanced";
    case "BE":
      return "Beginner";
    case "IN":
      return "Intermediate";
  }
};

const LevelMenu: React.FC<{
  selected: Level;
  onSelect: (level: Level) => void;
}> = ({ selected, onSelect }) => {
  return (
    <Menu as="div" className="relative inline-flex mt-3 md:mt-0">
      <div>
        <Menu.Button className="bg-white inline-flex justify-center appearance-none border border-gray-300 rounded w-full p-2 text-gray-800 text-xs leading-tight focus:outline-none focus:shadow-outline items-center">
          <span>{toStr(selected)}</span>
          <ChevronDownIcon
            className="w-4 h-4 ml-2 text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="text-xs absolute mt-10 bg-white rounded focus:outline-none pb-1 border border-gray-300 shadow justify-left z-10">
          <LevelMenuItem selected={selected} value={"AN"} onSelect={onSelect} />
          <LevelMenuItem selected={selected} value={"BE"} onSelect={onSelect} />
          <LevelMenuItem selected={selected} value={"IN"} onSelect={onSelect} />
          <LevelMenuItem selected={selected} value={"AD"} onSelect={onSelect} />
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default LevelMenu;