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
        <span className="text-gray-700 text-sm font-semibold mb-2 block">
          {props.name}
        </span>
        <textarea
          rows={2}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline resize-y overflow-hidden"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            props.onChange(event.target.value);
          }}
        />
      </label>
    </div>
  );
}