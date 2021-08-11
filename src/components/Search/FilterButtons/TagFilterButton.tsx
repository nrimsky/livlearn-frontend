import React from "react";
import { Tag } from "../../../types/ResourceRec";
import FilterButton from "./FilterButton";

const TagFilterButton = React.memo((props: {
  tag: Tag;
  selected: boolean;
  onClick: (tag: Tag) => void;
  key?: string|number;
}) => {
  return (
    <FilterButton
      selected={props.selected}
      onClick={() => {
        props.onClick(props.tag);
      }}
      className={`rounded 
                px-2  
                text-sm 
                inline-flex  
                items-center 
                truncate  
                align-middle  
                text-left  
                tracking-tight  
                ${props.selected ? `bg-green-100 hover:bg-green-200 dark:bg-green-900 
                text-green-600 dark:text-green-500
                bg-opacity-50 dark:bg-opacity-20 hover:bg-opacity-50 dark:hover:bg-opacity-75
                border border-transparent`:
                `bg-transparent hover:bg-gray-300 dark:hover:bg-gray-600 hover:bg-opacity-50 dark:hover:bg-opacity-50
                border border-gray-300 dark:border-gray-600
                text-gray-900 dark:text-white`
                }`}
    >
      {props.tag.name}
    </FilterButton>
  );
});

export default TagFilterButton;