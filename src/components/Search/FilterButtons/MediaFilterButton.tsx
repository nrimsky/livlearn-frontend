import React from "react";
import { mediaTypeFromApiType } from "../../../types/MediaType";
import { Type } from "../../../types/ResourceRec";
import Icon from "../../Icon/Icon";
import FilterButton from "./FilterButton";

const MediaFilterButton = React.memo((props: {
  type: Type;
  selected: boolean;
  onClick: (type: Type) => void;
  key?: string|number;
}) => {
  return (
    <FilterButton
      selected={props.selected}
      onClick={() => {
        props.onClick(props.type);
      }}
      className={`rounded 
                pr-2 pl-1 
                text-sm  
                inline-flex  
                align-middle 
                items-center  
                truncate 
                text-left 
                tracking-tight  
                ${
                  props.selected
                    ? `bg-blue-100 hover:bg-blue-200 dark:bg-blue-900 
                text-blue-600 dark:text-blue-500
                bg-opacity-50 dark:bg-opacity-20 hover:bg-opacity-50 dark:hover:bg-opacity-75
                border border-transparent`
                    : `bg-transparent hover:bg-gray-300 dark:hover:bg-gray-600 hover:bg-opacity-50 dark:hover:bg-opacity-50
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-white`
                }`}
    >
      <Icon
        mediaType={mediaTypeFromApiType(props.type)}
        className="py-0.5 inline-block mr-1 text-blue-600 dark:text-blue-500"
      />
      {mediaTypeFromApiType(props.type)}
    </FilterButton>
  );
});

export default MediaFilterButton;
