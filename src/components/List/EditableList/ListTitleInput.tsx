import React from "react";
import classNames from "../../../helpers/classNames";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const ListTitleInput = React.memo(({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Name this collection"
      value={value}
      className={classNames(
        "mb-4 py-1 px-2 outline-none focus:outline-none w-full border-b border-gray-300 dark:border-gray-500 text-gray-900 dark:text-gray-100 no-round",
        value === "" ? "bg-white dark:bg-gray-900" : "bg-gray-100 dark:bg-gray-800"
      )}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
          onChange(event.target.value.slice(0, 250));
        } else {
          onChange("");
        }
      }}
    />
  );
});

export default ListTitleInput;
