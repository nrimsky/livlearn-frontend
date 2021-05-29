import ResourceListItem from "./ResourceListItem";
import firebase from "firebase/app";
import "firebase/firestore";

type ResourceList = {
  creatorId: string|null;
  isPublic: boolean;
  title: string;
  data: ResourceListItem[];
  id?: string;
  createdAt?: firebase.firestore.Timestamp;
};

export default ResourceList;
