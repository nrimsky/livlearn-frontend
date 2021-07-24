import React from "react";

type Props = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  widgets?: React.ReactNode;
};

const CardCollection = ({ title, children, widgets, subtitle }: Props) => {
  return (
    <div className="md:px-5 w-full mt-5">
      <div className="my-3">
        <h2 className="w-100 text-gray-900 dark:text-white text-xl font-medium px-4 md:pl-0 leading-tight tracking-tight">
          {title}
        </h2>
        {subtitle && <p className="dark:text-gray-400 text-gray-500 text-sm">{subtitle}</p>}
      </div>
      {!!widgets && widgets}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-4 auto-rows-max w-100">
        {children}
      </div>
    </div>
  );
};

export default CardCollection;
