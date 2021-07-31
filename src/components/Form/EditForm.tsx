import React, { useState } from "react";
import ResourceListItem from "../../types/ResourceListItem";
import LabelledInput from "./LabelledInputs/LabelledInput";
import TypePicker from "./TypePicker";
import MediaType from "../../types/MediaType";
import Button from "../Button/Button";
import LabelledTextarea from "./LabelledInputs/LabelledTextarea";

export default function EditForm(props: {
  onClose: () => void;
  onItemChange: (item: ResourceListItem) => void;
  onItemDelete: () => void;
  initial: ResourceListItem;
}) {
  const [item, setItem] = useState<ResourceListItem>(props.initial);

  const onDone = () => {
    props.onItemChange(item);
    props.onClose();
  };

  const onDelete = () => {
    props.onItemDelete();
    props.onClose();
  };

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
            onChange({ ...item, title: newValue.substring(0, 500) })
          }
          value={item.title}
        />
        <LabelledTextarea
          name="Detail"
          placeholder="Any additional detail"
          onChange={(newValue: string) =>
            onChange({ ...item, detail: newValue.substring(0, 3000) })
          }
          value={item.detail}
        />
        <LabelledInput
          name="URL"
          placeholder="Paste in the URL"
          onChange={(newValue: string) => onChange({ ...item, url: newValue.substring(0, 1000) })}
          value={item.url}
        />
      </form>
      <div className="mt-4 flex">
        <Button color="red" onClick={onDelete} text="Delete" className="flex-none mr-3"/>
        <Button color="green" onClick={onDone} text="Save" className="flex-1"/>
      </div>
    </div>
  );
}
