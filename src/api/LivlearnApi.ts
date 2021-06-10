import ResourceRec, { Level, Tag, Type } from "../types/ResourceRec";
import axios from "axios";

const API_ROOT = "https://api.livlearn.howshouldilearn.com/";

// TODO:
// Pagination / infite scroll
// Search and filter widgets
// More details popup
// Add a link to a list (bookmark (add to a list called bookmarks) or add to existing list)

export type Query = {
  tagIds: number[];
  types: Type[];
  levels: Level[];
};

const queryString = ({ tagIds, types, levels }: Query) => {
  return `?tags=${tagIds.map(toString).join(",")}&type=${types.join(
    ","
  )}&level=${levels.join(",")}`;
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
