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
        <p className="mb-4 py-1 px-2 rounded outline-none border border-gray-200 text-sm">
          {resourceList.title}
        </p>
      </div>
      <ul className="sm:rounded border border-gray-200 divide-y divide-gray-200">
        {resourceList.data.map((d, i) => {
          return <li
            className="pl-3 pr-4 py-3 cursor-pointer bg-white grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-sm"
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
