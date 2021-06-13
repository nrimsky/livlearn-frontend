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
        "text-xs font-semibold px-3 py-1 focus:outline-none border-2 rounded flex-none focus:ring focus:ring-green-200 focus:ring-opacity-50 ring-inset",
        className ?? ""
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export const SmallLinkButton: React.FC<{
  href: string;
  text: string;
  className?: string;
}> = ({ href, text, className }) => {
  return (
    <a
      className={classNames(
        "text-xs font-semibold px-3 py-1 focus:outline-none border-2 rounded flex-none focus:ring focus:ring-green-200 focus:ring-opacity-50 ring-inset",
        className ?? ""
      )}
      target="_blank"
      rel="noreferrer"
      href={href}
    >
      {text}
    </a>
  );
};

export default SmallOutlineButton;
