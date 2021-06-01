import React from "react";

export default function Input(props: {
  name: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  value: string;
}) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="text-gray-700 text-sm font-semibold mb-2 block">
          {props.name}
        </span>
        <input
          className="appearance-none border border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let str = event.target.value;
            if (str) {
              // Avoid entries larger than 250
              str = str.slice(0, 250);
            }
            props.onChange(str);
          }}
        />
      </label>
    </div>
  );
}
