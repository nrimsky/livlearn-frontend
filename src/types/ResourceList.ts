import ItemData from "./ItemData";

type ResourceList = {
  creatorId: string|null;
  isPublic: boolean;
  title: string;
  data: ItemData[];
};

export default ResourceList;
