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
  id: string | null;
  onClose: () => void;
}) {
  let history = useHistory();

  function saveNewList(isPublic: boolean) {
    saveNewListForUser(
      props.state,
      isPublic,
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
    if (props.id) {
      edit(props.id);
    } else {
      saveNewList(false);
    }
  };

  return (
    <div className="w-full">
      <p>
        {props.id
          ? "Update your list with a click of a button!"
          : "Now it's time to publish your list!"}
      </p>
      <div className="mt-3">
        <Button
          color="green"
          onClick={onSave}
          text={props.id ? "Publish Changes" : "Publish List"}
        />
      </div>
    </div>
  );
}
