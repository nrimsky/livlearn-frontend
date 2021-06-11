import React from "react";
import classNames from "../../helpers/classNames";

const SmallOutlineButton: React.FC<{
  onClick: () => void;
  text: string;
  className?: string;
}> = ({ onClick, text, className }) => {
  return (
    <button
      className={classNames(
        "text-xs font-semibold px-3 py-1 focus:outline-none border-2 rounded flex-none",
        className ?? ""
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SmallOutlineButton;
