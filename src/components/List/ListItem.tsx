import React, { useState } from "react";
import Icon from "../Icon/Icon";
import { LinkIcon } from "@heroicons/react/outline";
import ItemData from "../../types/ItemData";
import BasePopup from "../../components/Popup/BasePopup";
import EditForm from "../../components/Form/EditForm";

type ListItemProps = {
  data: ItemData;
  onItemChange: (newItem: ItemData) => void;
  key: number;
  onItemDelete: () => void;
  editable?: boolean;
};

const ListItem = React.memo(({
  data,
  onItemChange,
  onItemDelete,
  editable,
}: ListItemProps) => {

  const [showEdit, setShowEdit] = useState(false);

  console.log(`List item ${data.title} rendered`);

  return (
    <>
      {editable && (
        <BasePopup
          isOpen={showEdit}
          onClickClose={() => setShowEdit(false)}
          title={"Edit Item"}
        >
          <EditForm
            onClose={() => setShowEdit(false)}
            initial={data}
            onItemChange={onItemChange}
            onItemDelete={onItemDelete}
          />
        </BasePopup>
      )}
      <li
        className="pl-3 pr-4 py-3 cursor-pointer bg-white hover:bg-green-50 grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-3 text-sm"
        onClick={editable ? () => setShowEdit(true) : undefined}
      >
        <div className="inline-flex">
          <Icon mediaType={data.type} />
          <p className="font-semibold ml-2">{data.title}</p>
        </div>
        <p className="">{data.detail}</p>
        <div className="underline text-green-500 hover:text-green-600 truncate">
          <span>
            <LinkIcon className="h-5 w-4 inline" />
            <a href={data.url} className="ml-2 truncate">
              {data.url}
            </a>
          </span>
        </div>
      </li>
    </>
  );
});

export default ListItem;