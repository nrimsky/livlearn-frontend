import MediaType from "./MediaType";

type ItemData = {
  title: string;
  type: MediaType;
  detail: string;
  url: string;
};

export type Keyed<T> = T & { key: number; };

export default ItemData;