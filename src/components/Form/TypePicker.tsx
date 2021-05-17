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
          <Menu.Button className="inline-flex justify-center appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-medium hover:bg-green-100">
            <Icon mediaType={props.mType} />
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
          <Menu.Items className="absolute mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-green-900">
            <div className="px-1 py-1">
              {Object.keys(MediaType).map((mediaType: string) => {
                const m = mediaType as keyof typeof MediaType;
                return (
                  <Menu.Item key={m}>
                    <button
                      onClick={(e) => handleClick(e, MediaType[m])}
                      className="group flex rounded-md items-center w-full pl-2 pr-4 py-2 text-sm hover:bg-green-100 focus:outline-none"
                    >
                      <Icon mediaType={MediaType[m]} />
                      <span className="ml-2 font-medium">{MediaType[m]}</span>
                    </button>
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
