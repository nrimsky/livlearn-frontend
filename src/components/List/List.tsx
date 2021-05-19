import React, { useContext } from "react";
import { AppContext } from "../../App";
import ListItem from "./ListItem";
import ItemData from "../../types/ItemData";

export default function List() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <div className="m-5">
      <input
        type="text"
        placeholder="Name this list"
        value={state.title}
        className="mb-4 py-2 px-3 rounded border-0 outline-none focus:outline-none focus:ring w-full ring-green-300 border border-gray-200"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch({ type: "RENAME", newTitle: event.target.value });
        }}
      />
      <ul className="border border-gray-200 rounded divide-y divide-gray-200">
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
