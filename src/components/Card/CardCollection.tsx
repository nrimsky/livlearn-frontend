import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
};

const CardCollection = ({ title, children }: Props) => {
  return <>
    <h2 className="p-5 w-full text-gray-800 text-xl font-semibold">{title}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:px-5 gap-4 auto-rows-max pb-5 w-full">
      {children}
    </div>
  </>;
};

export default CardCollection;
