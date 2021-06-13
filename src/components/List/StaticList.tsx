import React from "react";
import ResourceList from "../../types/ResourceList";
import { LinkIcon } from "@heroicons/react/outline";
import Icon from "../Icon/Icon";

type Props = {
  resourceList: ResourceList;
};

const StaticList = ({ resourceList }: Props) => {
  return (
    <div className="sm:m-5 my-5">
      <div className="mx-5 sm:mx-0 w-100">
        <p className="mb-3 px-2 w-full text-gray-900 dark:text-gray-100 font-medium no-round leading-snug">
          {resourceList.title}
        </p>
      </div>
      <ul className="sm:rounded border-t border-b sm:border border-gray-300 dark:border-gray-500 divide-y divide-gray-200 dark:divide-gray-500">
        {resourceList.data.map((d, i) => {
          return <li
            className="pl-3 pr-4 py-3 bg-white dark:bg-gray-900 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 leading-snug text-gray-900 dark:text-gray-100"
            key={i}
          >
            <div className="inline-flex">
              <Icon mediaType={d.type} />
              <p className="font-semibold ml-2">{d.title}</p>
            </div>
            <p className="">{d.detail}</p>
            <div className="underline text-green-500 hover:text-green-600 truncate">
              <span>
                <LinkIcon className="h-5 w-4 inline" />
                <a href={d.url} className="ml-2 truncate">
                  {d.url}
                </a>
              </span>
            </div>
          </li>;
        })}
      </ul>
    </div>
  );
};

export default StaticList;
