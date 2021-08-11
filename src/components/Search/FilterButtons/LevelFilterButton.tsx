import React from "react";
import {
  Level,
  levelFromAbbr,
} from "../../../types/ResourceRec";
import FilterButton from "./FilterButton";

const LevelFilterButton = React.memo((props: {
  level: Level;
  selected: boolean;
  onClick: (level: Level) => void;
  key?: string|number;
}) => {
  return (
    <FilterButton
      selected={props.selected}
      onClick={() => {
        props.onClick(props.level);
      }}
      className={`rounded
                    px-2 
                    text-sm 
                    inline-flex
                    align-middle 
                    items-center 
                    truncate
                    text-left
                    tracking-tight 
                    ${
                      props.selected
                        ? `bg-purple-200 dark:bg-purple-800 
                    text-purple-600 dark:text-purple-300
                    bg-opacity-50 dark:bg-opacity-20 hover:bg-opacity-75 dark:hover:bg-opacity-40
                    border border-transparent`
                        : `bg-transparent hover:bg-gray-300 dark:hover:bg-gray-600 hover:bg-opacity-50 dark:hover:bg-opacity-50
                    border border-gray-300 dark:border-gray-600
                    text-gray-900 dark:text-white`
                    }`}
    >
      {levelFromAbbr(props.level)}
    </FilterButton>
  );
});

export default LevelFilterButton;
