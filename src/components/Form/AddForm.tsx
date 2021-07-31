import React, { useState } from "react";
import ResourceListItem from "../../types/ResourceListItem";
import MediaType from "../../types/MediaType";
import LabelledInput from "./LabelledInputs/LabelledInput";
import TypePicker from "./TypePicker";
import Button from "../Button/Button";
import LabelledTextarea from "./LabelledInputs/LabelledTextarea";

export default function AddForm(props: {
  onClose: () => void;
  onAdd: (i: ResourceListItem) => void;
}) {
  const [item, setItem] = useState<ResourceListItem>({
    url: "",
    title: "",
    detail: "",
    type: MediaType.Other,
  });

  const onChange = (i: ResourceListItem) => {
    setItem(i);
  };

  return (
    <div className="w-full">
      <form className="my-6">
        <div className="mb-4">
          <label className="block">
            <span className="text-gray-900  dark:text-white  font-semibold mb-2 block">
              Type
            </span>
            <TypePicker
              mType={item.type}
              onChange={(mType: MediaType) => {
                setItem({ ...item, type: mType });
              }}
            />
          </label>
        </div>
        <LabelledInput
          name="Title"
          placeholder="What is the resource name"
          onChange={(newValue: string) =>
            onChange({ ...item, title: newValue })
          }
          value={item.title}
        />
        <LabelledTextarea
          name="Detail"
          placeholder="Any additional detail"
          onChange={(newValue: string) =>
            onChange({ ...item, detail: newValue })
          }
          value={item.detail}
        />
        <LabelledInput
          name="URL"
          placeholder="Paste in the URL"
          onChange={(newValue: string) => onChange({ ...item, url: newValue })}
          value={item.url}
        />
      </form>
      <div className="mt-4">
        <Button color="green" onClick={() => {
          props.onAdd(item);
          props.onClose();
        }} text="Add" />
      </div>
    </div>
  );
}
