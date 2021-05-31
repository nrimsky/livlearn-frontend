import React from "react";

type HomeCardProps = {
  title: string;
  text: string;
  onLinkClick?: () => void;
  linkText: string;
  key: number;
};

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  text,
  onLinkClick,
  linkText,
}) => {
  return (
    <div className="max-w max-h py-3 px-4 bg-white shadow sm:rounded w-screen sm:w-auto flex flex-col">
      <div className="flex-grow">
        <h2 className="text-gray-800 font-semibold">{title}</h2>
        <p className="mt-2 text-gray-600 text-sm">{text}</p>
      </div>
      <div className="flex justify-end mt-4">
        <button
          className="font-medium text-green-500 focus:outline-none"
          onClick={onLinkClick}
        >
          {linkText}
        </button>
      </div>
    </div>
  );
};

export default HomeCard;
