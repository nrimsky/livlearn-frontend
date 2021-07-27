import React, { useContext } from "react";
import Button from "../Button/Button";

import { useHistory } from "react-router-dom";
import {
  saveNewListForUser,
  editExitingList,
} from "../../firebase/FirestoreService";
import ResourceList from "../../types/ResourceList";
import { BannerContext } from "../../App";

export default function DeployForm(props: {
  state: ResourceList;
  onClose: () => void;
  setChangesSaved: () => void;
}) {
  let history = useHistory();
  const { setErrorMessage } = useContext(BannerContext);

  const saveNewList = async () => {
    try {
      const id = await saveNewListForUser(props.state);
      history.push(`/list/${id}`);
      props.setChangesSaved();
      props.onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
      props.onClose();
    }
  };

  const edit = async () => {
    try {
      await editExitingList(props.state);
      props.setChangesSaved();
      props.onClose();
    } catch (error) {
      console.error(error);
      setErrorMessage(error);
      props.onClose();
    }
  };

  const onSave = async () => {
    if (props.state.id) {
      await edit();
    } else {
      await saveNewList();
    }
  };

  return (
    <div className="w-full">
      <p className="text-gray-900 dark:text-white">
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
