import React, { useContext } from "react";
import { ListContext } from "../Page/MakeList";
import Button from "../Button/Button";

import { useHistory } from "react-router-dom";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export default function DeployForm(props: {
  id: string | null;
  onClose: () => void;
}) {
  var db = firebase.firestore();

  const { state } = useContext(ListContext);
  let history = useHistory();

  function saveNewList(isPublic: boolean) {
    const user = firebase.auth().currentUser;
    if (!user) { console.error("No signed in user"); return; }
    db.collection("lists")
      .add({
        ...state,
        creatorId: user.uid,
        isPublic: isPublic
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        history.replace({
          search: `id=${docRef.id}`
        });
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
