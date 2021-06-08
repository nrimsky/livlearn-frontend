import ResourceListItem from "./ResourceListItem";
import firebase from "firebase/app";
import "firebase/firestore";
import ShareSettings from "./ShareSettings";

type ResourceList = {
  creatorId: string|null;
  shareSettings: ShareSettings;
  title: string;
  data: ResourceListItem[];
  upvotes: string[];
  id?: string;
  lastChanged?: firebase.firestore.Timestamp;
};

export default ResourceList;
