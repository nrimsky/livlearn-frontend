import MediaType from "./MediaType";

type ResourceListItem = {
  title: string;
  type: MediaType;
  detail: string;
  url: string;
  index?: number;
};

export default ResourceListItem;
