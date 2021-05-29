import React from "react";
import Icon from "../../Icon/Icon";
import { LinkIcon } from "@heroicons/react/outline";
import ResourceListItem from "../../../types/ResourceListItem";

type Props = {
  data: ResourceListItem;
  onClick?: () => void;
  key: number;
};

const Item = React.memo(({ data, onClick }: Props) => {
  return (
    <li
      className="pl-3 pr-4 py-3 cursor-pointer bg-white hover:bg-green-50 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-sm"
      onClick={onClick}
    >
      <div className="inline-flex">
        <Icon mediaType={data.type} />
        <p className="font-semibold ml-2">{data.title}</p>
      </div>
      <p className="">{data.detail}</p>
      <div className="underline text-green-500 hover:text-green-600 truncate">
        <span>
          <LinkIcon className="h-5 w-4 inline" />
          <a href={data.url} className="ml-2 truncate">
            {data.url}
          </a>
        </span>
      </div>
    </li>
  );
});

export default Item;
