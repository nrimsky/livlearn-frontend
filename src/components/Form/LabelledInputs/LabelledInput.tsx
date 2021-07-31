import React from "react";
import LLInput from "../Inputs/LLInput";

export default function LabelledInput(props: {
  name: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  value: string;
  maxLen?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="text-gray-900  dark:text-white  font-semibold mb-2 block">
          {props.name}
        </span>
        <LLInput
          type="text"
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            let str = event.target.value;
            if (str) {
              str = str.slice(0, props.maxLen ? props.maxLen : 250);
            }
            props.onChange(str);
          }}
        />
      </label>
    </div>
  );
}
