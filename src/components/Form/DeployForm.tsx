import React from "react";
import Button from "../Button/Button";

import { useHistory } from "react-router-dom";
import {
  saveNewListForUser,
  editExitingList,
} from "../../firebase/FirestoreService";
import ResourceList from "../../types/ResourceList";

export default function DeployForm(props: {
  state: ResourceList;
  onClose: () => void;
}) {
  let history = useHistory();

  function saveNewList() {
    saveNewListForUser(
      props.state,
      (id) => {
        history.push(`/list/${id}`);
        props.onClose();
      },
      (message) => {
        console.error(message);
      }
    );
  }

  function edit(id: string) {
    editExitingList(id, props.state, props.onClose, (e) => {
      console.error("Error writing document: ", e);
      props.onClose();
    });
  }

  const onSave = () => {
    if (props.state.id) {
      edit(props.state.id);
    } else {
      saveNewList();
    }
  };

  return (
    <div className="w-full">
      <p>
        {props.state.id
          ? "Update your list with a click of a button!"
          : "Now it's time to publish your list!"}
      </p>
      <div className="mt-3">
        <Button
          color="green"
          onClick={onSave}
          text={props.state.id ? "Publish Changes" : "Publish List"}
        />
      </div>
    </div>
  );
}
