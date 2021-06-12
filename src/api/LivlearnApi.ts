import ResourceRec, { Level, Tag, Type } from "../types/ResourceRec";
import axios from "axios";

const API_ROOT = "https://api.livlearn.howshouldilearn.com/";

// TODO:
// Pagination / infite scroll
// Add a link to a list (bookmark (add to a list called bookmarks) or add to existing list)
// Firestore rules length limits
// Just one collections tab with a new button
// Recommend tab
// Learning plan tab
// Tips tab

export type Query = {
  tagIds: number[];
  types: Type[];
  level: Level;
  search?: string;
};

const queryString = ({ tagIds, types, level, search }: Query) => {
  let lq = "";
  if (level !== "AN") {
    lq = `${level},AN`;
  }
  let tq = (types.length === 9) ? [] : types;
  return `?tags=${tagIds.map(toString).join(",")}&type=${tq.join(
    ","
  )}&level=${lq}&search=${search}&ordering=-created_at&page_size=30`;
};

const isResourceRec = (resourceRec: any) => {
  return (
    resourceRec.id &&
    resourceRec.tags &&
    resourceRec.created_at &&
    resourceRec.level &&
    resourceRec.type &&
    resourceRec.url &&
    resourceRec.description &&
    resourceRec.tagline &&
    resourceRec.name
  );
};

const isTag = (tag: any) => {
  return tag.name && tag.id;
};

export async function getResources(query: Query): Promise<ResourceRec[]> {
  const url = API_ROOT + "links/" + queryString(query);
  const response = await axios.get(url);
  const results = response.data.results;
  if (results) {
    return results.filter(isResourceRec).map((i: any) => i as ResourceRec);
  } else {
    throw Error("No results");
  }
}

export async function getTags(): Promise<Tag[]> {
  const url = API_ROOT + "tags";
  const response = await axios.get(url);
  const results = response.data.results;
  if (results) {
    return results.filter(isTag).map((i: any) => i as Tag);
  } else {
    throw Error("No results");
  }
}
