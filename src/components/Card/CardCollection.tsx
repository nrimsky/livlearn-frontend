import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const CardCollection = ({ title, children }: Props) => {
  return <div className="sm:mx-auto sm:px-5 py-5 w-full">
    <h2 className="my-3 w-100 text-gray-900 text-2xl font-medium pl-5 sm:pl-0">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 auto-rows-max w-100">
      {children}
    </div>
  </div>;
};

export default CardCollection;
