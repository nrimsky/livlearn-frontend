import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  widgets?: React.ReactNode;
};

const CardCollection = ({ title, children, widgets }: Props) => {
  return (
    <div className="md:mx-auto md:px-5 w-full mt-5">
      <h2 className="my-3 w-100 text-gray-900  dark:text-white text-xl font-medium px-4 md:pl-0 leading-tight tracking-tight">
        {title}
      </h2>
      {!!widgets && widgets}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 auto-rows-max w-100">
        {children}
      </div>
    </div>
  );
};

export default CardCollection;
