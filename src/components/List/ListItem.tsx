import React, { useState } from "react";
import Icon from "../Icon/Icon";
import { LinkIcon } from "@heroicons/react/outline";
import ItemData, { Keyed } from "../../types/ItemData";
import BasePopup from "../../components/Popup/BasePopup";
import EditForm from "../../components/Form/EditForm";

export default function ListItem(props: {data: ItemData, onItemChange: (newItem: ItemData) => void, key: number}) {

  const [showEdit, setShowEdit] = useState(false);

  return (
    <>
      <BasePopup
        isOpen={showEdit}
        onClickClose={() => setShowEdit(false)}
        title={"Edit"}
      >
        <EditForm onClose={() => setShowEdit(false)} initial={props.data} onItemChange={props.onItemChange}/>
      </BasePopup>
      <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm cursor-pointer hover:bg-green-50" onClick={() => setShowEdit(true)}>
        <div className="flex-1 flex items-start md:items-centre flex-col md:flex-row">
          <Icon mediaType={props.data.type} />
          <span className="md:ml-2 flex-1 mt-2 md:mt-0 font-semibold md:flex-grow">
            {props.data.title}
          </span>
          <span className="md:ml-4 flex-1 mt-2 md:mt-0 md:flex-grow">
            {props.data.detail}
          </span>
          <div className="inline-flex md:ml-4 flex-1 mt-2 md:mt-0 underline text-green-600 hover:text-green-800 md:flex-grow">
            <LinkIcon className="h-5 w-4" />
            <a href={props.data.url} className="flex-1 ml-2">
              {props.data.url}
            </a>
          </div>
        </div>
      </li>
    </>
  );
}
