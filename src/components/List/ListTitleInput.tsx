import React from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const ListTitleInput = ({ value, onChange }: Props) => {
  return (
    <input
      type="text"
      placeholder="Name this list"
      value={value}
      className="mb-4 py-2 px-3 rounded outline-none focus:outline-none focus:ring w-full ring-green-300 border border-gray-200"
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
          onChange(event.target.value.slice(0, 250));
        } else {
          onChange("");
        }
      }}
    />
  );
};

export default ListTitleInput;
