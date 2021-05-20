import React, { useContext } from "react";
import { ListContext } from "../Page/MakeList";
import ListItem from "./ListItem";
import ItemData from "../../types/ItemData";

export default function List() {
  const { state, dispatch } = useContext(ListContext);

  return (
    <div className="m-5">
      <input
        type="text"
        placeholder="Name this list"
        value={state.title}
        className="mb-4 py-2 px-3 rounded outline-none focus:outline-none focus:ring w-full ring-green-300 border border-gray-200"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.value) {
            dispatch({ type: "RENAME", newTitle: event.target.value.slice(0,250) });
          } else {
            dispatch({ type: "RENAME", newTitle: "" });
          }
        }}
      />
      <ul className="rounded border border-gray-200 divide-y divide-gray-200">
        {state.data.map((item, index) => (
          <ListItem
            data={item}
            key={index}
            onItemChange={(newData: ItemData) => {
              dispatch({ type: "EDIT", index: index, newData: newData });
            }}
            onItemDelete={() => {
              dispatch({ type: "DELETE", index: index })
            }}
          />
        ))}
      </ul>
    </div>
  );
}
