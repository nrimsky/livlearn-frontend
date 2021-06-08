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

  const saveNewList = async () => {
    try {
      const id = await saveNewListForUser(props.state);
      history.push(`/list/${id}`);
      props.onClose();
    } catch (error) {
      console.error(error);
      props.onClose();
    }
  };

  const edit = () => {
    try {
      editExitingList(props.state);
      props.onClose();
    } catch (error) {
      console.error(error);
      props.onClose();
    }
  };

  const onSave = () => {
    if (props.state.id) {
      edit();
    } else {
      saveNewList();
    }
  };

  return (
    <div className="w-full">
      <p>
        {props.state.id
          ? "Update your collection with a click of a button!"
          : "Now it's time to publish your collection!"}
      </p>
      <div className="mt-3">
        <Button
          color="green"
          onClick={onSave}
          text={props.state.id ? "Publish Changes" : "Publish collection"}
        />
      </div>
    </div>
  );
}
