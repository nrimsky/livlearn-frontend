import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Icon from "../Icon/Icon";
import MediaType from "../../types/MediaType";

export default function TypePicker(props: {
  mType: MediaType;
  onChange: (mType: MediaType) => void;
}) {
  function handleClick(
    event: React.MouseEvent<HTMLButtonElement>,
    t: MediaType
  ) {
    event.preventDefault();
    props.onChange(t);
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-200 dark:bg-gray-800 rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 border border-gray-300 dark:border-gray-500">
            <Icon mediaType={props.mType} className="text-green-500"/>
            <span className="ml-2">{props.mType}</span>
            <ChevronDownIcon
              className="w-5 h-5 ml-2 -mr-1 text-green-500"
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
          <Menu.Items className="absolute right-0 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black dark:ring-white ring-opacity-10 dark:ring-opacity-10 focus:outline-none bg-white dark:bg-gray-900">
            <div className="px-1 py-1">
              {Object.keys(MediaType).map((mediaType: string) => {
                const m = mediaType as keyof typeof MediaType;
                return (
                  <Menu.Item key={m}>
                    {({ active }) => (
                      <button
                        onClick={(e) => handleClick(e, MediaType[m])}
                        className={`${
                          active ? "bg-green-100 dark:bg-gray-800" : "bg-white dark:bg-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900 dark:text-white`}
                      >
                        <Icon mediaType={MediaType[m]} className={`${active ? "text-white": "text-green-500"}`}/>
                        <span className="ml-2 font-medium">{MediaType[m]}</span>
                      </button>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
