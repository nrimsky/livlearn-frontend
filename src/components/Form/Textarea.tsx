import React from "react";

export default function Textarea(props: {
  name: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  value: string;
}) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="text-gray-900 font-semibold mb-2 block">
          {props.name}
        </span>
        <textarea
          rows={2}
          className="resize-y overflow-hidden appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
