import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { XIcon } from "@heroicons/react/outline";

export default function BasePopup(props: {
  isOpen: boolean;
  onClickClose: () => void;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <Dialog
        as="div"
        className={"fixed inset-0 z-10 overflow-y-auto "}
        onClose={props.onClickClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <button
                onClick={props.onClickClose}
                className="focus:outline-none absolute top-4 right-4"
              >
                <XIcon className="text-gray-800 h-5 w-5" />
              </button>
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-800"
              >
                {props.title}
              </Dialog.Title>
              <div className="mt-2">{props.children}</div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
