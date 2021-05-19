import React, { useState } from "react";
import Icon from "../Icon/Icon";
import { LinkIcon } from "@heroicons/react/outline";
import ItemData from "../../types/ItemData";
import BasePopup from "../../components/Popup/BasePopup";
import EditForm from "../../components/Form/EditForm";

export default function ListItem(props: {
  data: ItemData;
  onItemChange: (newItem: ItemData) => void;
  key: number;
  onItemDelete: () => void;
}) {
  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <BasePopup
        isOpen={showEdit}
        onClickClose={() => setShowEdit(false)}
        title={"Edit Item"}
      >
        <EditForm
          onClose={() => setShowEdit(false)}
          initial={props.data}
          onItemChange={props.onItemChange}
          onItemDelete={props.onItemDelete}
        />
      </BasePopup>
      <li
        className="pl-3 pr-4 py-3 cursor-pointer bg-white hover:bg-green-50 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-sm"
        onClick={() => setShowEdit(true)}
      >
        <div className="inline-flex">
          <Icon mediaType={props.data.type} />
          <p className="font-semibold ml-2">{props.data.title}</p>
        </div>
        <p className="">{props.data.detail}</p>
        <div className="underline text-green-500 hover:text-green-600 truncate">
          <span>
            <LinkIcon className="h-5 w-4 inline" />
            <a href={props.data.url} className="ml-2 truncate">
              {props.data.url}
            </a>
          </span>
        </div>
      </li>
    </>
  );
}
