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
        "rounded-full px-2 text-xs inline-flex mr-1 mb-1 font-medium items-center tracking-tight border border-transparent",
        props.level === "AD" ? "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100 dark:border-red-500" : "",
        props.level === "BE" ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100 dark:border-green-500" : "",
        props.level === "IN" ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100 dark:border-yellow-500" : "",
        props.level === "AN" ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100 dark:border-blue-500" : ""
      )}
    >
      {levelText()}
    </div>
  );
});

export default LevelPill;