import { Level } from "../../../types/ResourceRec";
import React from "react";
import classNames from "../../../helpers/classNames";

const LevelPill = React.memo((props: { level: Level }) => {
  const levelText = () => {
    switch (props.level) {
      case "AD":
        return "Advanced";
      case "AN":
        return "Any level";
      case "BE":
        return "Beginner";
      case "IN":
        return "Intermediate";
    }
  };
  return (
    <div
      className={classNames(
        "rounded-full px-2 text-xs inline-flex mr-1 mb-1 font-medium items-center tracking-tight border",
        props.level === "AD" ? "bg-red-50 border-red-50 text-red-800 dark:text-red-500 dark:border-red-500" : "",
        props.level === "BE" ? "bg-blue-50 border-blue-50 text-blue-800 dark:text-blue-500 dark:border-blue-500" : "",
        props.level === "IN" ? "bg-yellow-50 border-yellow-50 text-yellow-800 dark:text-yellow-500 dark:border-yellow-500" : "",
        props.level === "AN" ? "bg-purple-50 border-purple-50 text-purple-800 dark:text-purple-500 dark:border-purple-500" : "",
        "dark:bg-transparent"
      )}
    >
      {levelText()}
    </div>
  );
});

export default LevelPill;