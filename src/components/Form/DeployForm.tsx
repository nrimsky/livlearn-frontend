import React, { useContext } from "react";
import { AppContext } from "../../App";
import Button from "../Button/Button";

import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";

export default function DeployForm(props: {
  id: string | null;
  onClose: () => void;
}) {
  var db = firebase.firestore();

  const { state } = useContext(AppContext);
  let history = useHistory();

  function saveNewList() {
    db.collection("lists")
      .add({
        ...state,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        history.push(`?id=${docRef.id}`);
        props.onClose();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function editExitingList(id: string) {
    db.collection("lists")
      .doc(id)
      .set({
        ...state,
      })
      .then(() => {
        console.log("Document successfully updated!");
        props.onClose();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        props.onClose();
      });
  }

  const onSave = () => {
    if (props.id) {
      editExitingList(props.id);
    } else {
      saveNewList();
    }
  };

  return (
    <div className="w-full">
      <p>
        {props.id
          ? "Update your list with a click of a button!"
          : "Now it's time to deploy your list!"}
      </p>
      <div className="mt-3">
        <Button
          color="green"
          onClick={onSave}
          text={props.id ? "Release changes" : "Deploy list"}
        />
      </div>
    </div>
  );
}
