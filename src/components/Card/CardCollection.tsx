import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const CardCollection = ({ title, children }: Props) => {
  return <div className="sm:px-5 py-5">
    <h2 className="my-3 w-full text-gray-800 text-2xl font-medium ml-5 sm:ml-0">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 auto-rows-max w-full">
      {children}
    </div>
  </div>;
};

export default CardCollection;
