import React from "react";
import ResourceListItem from "../../../types/ResourceListItem";
import { ViewListIcon, LinkIcon } from "@heroicons/react/solid";
import { Draggable } from "react-beautiful-dnd";
import Icon from "../../Icon/Icon";

const DraggableListItem = React.memo(
  (props: {
    item: ResourceListItem;
    idx: number;
    openEdit: (item: ResourceListItem, idx: number) => void;
    key: string;
  }) => {
    return (
      <Draggable
        draggableId={"draggable=" + props.item.url + props.item.title}
        index={props.idx}
      >
        {(provided) => (
          <li
            role="button"
            aria-label="click to edit"
            aria-haspopup="true"
            className="pl-3 pr-4 py-3 text-gray-900 cursor-pointer bg-white dark:bg-gray-900 hover:bg-green-50 dark:hover:bg-gray-800 dark:text-gray-200 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 relative leading-snug"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div
              {...provided.dragHandleProps}
              className="absolute right-0 top-0 p-3"
            >
              <ViewListIcon className="flex-shrink-0 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            <div
              className="inline-flex"
              onClick={() => props.openEdit(props.item, props.idx)}
            >
              <Icon mediaType={props.item.type} />
              <p className="font-semibold ml-2">{props.item.title}</p>
            </div>
            <p
              className=""
              onClick={() => props.openEdit(props.item, props.idx)}
            >
              {props.item.detail}
            </p>
            <div className="underline text-green-500 hover:text-green-600 truncate mr-10">
              <span>
                <LinkIcon className="h-5 w-4 inline" />
                <a href={props.item.url} className="ml-2 truncate">
                  {props.item.url}
                </a>
              </span>
            </div>
          </li>
        )}
      </Draggable>
    );
  }
);

export default DraggableListItem;
