import React from "react";
import LLTextArea from "../Inputs/LLTextArea";

export default function LabelledTextarea(props: {
  name: string;
  placeholder: string;
  onChange: (newValue: string) => void;
  value: string;
  rows?: number;
  maxLen?: number;
}) {
  return (
    <div className="mb-4">
      <label className="block">
        <span className="text-gray-900  dark:text-white font-semibold mb-2 block">
          {props.name}
        </span>
        <LLTextArea
          rows={props.rows ?? 2}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            let str = event.target.value;
            if (str) {
              str = str.slice(0, props.maxLen ? props.maxLen : 3000);
            }
            props.onChange(str);
          }}
        />
      </label>
    </div>
  );
}
