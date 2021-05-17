import React, { useState } from "react";
import ItemData from "../../types/ItemData";
import Input from "./Input";

export default function EditForm(props: {
  onClose: () => void;
  onItemChange: (item: ItemData) => void;
  initial: ItemData;
}) {
  const [item, setItem] = useState<ItemData>(props.initial);

  const onDone = () => {
    props.onItemChange(item);
    props.onClose();
  };

  const onChange = (i: ItemData) => {
    setItem(i);
  };

  return (
    <div className="w-full">
      <form className="my-6">
        <Input
          name="Title"
          placeholder="What is the resource name"
          onChange={(newValue: string) =>
            onChange({ ...item, title: newValue })
          }
          value={item.title}
        />
        <Input
          name="Detail"
          placeholder="Any additional detail"
          onChange={(newValue: string) =>
            onChange({ ...item, detail: newValue })
          }
          value={item.detail}
        />
        <Input
          name="URL"
          placeholder="Paste in the URL"
          onChange={(newValue: string) => onChange({ ...item, url: newValue })}
          value={item.url}
        />
      </form>
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-green-900 bg-green-100 border border-transparent rounded-md hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-500"
          onClick={onDone}
        >
          Done
        </button>
      </div>
    </div>
  );
}
