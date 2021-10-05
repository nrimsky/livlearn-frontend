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
// Suggest form
// highlight publish changes when publish changes is needed

export type Query = {
  tagIds?: number[];
  types?: Type[];
  level?: Level;
  search?: string;
  pageSize?: number;
  id?: number[];
};

const numsToStrList = (arr: number[]) => {
  return arr.map((i) => (i as number).toString()).join(",");
};

const queryString = ({ tagIds, types, level, search, pageSize, id }: Query) => {
  let lq = "";
  if (level && level !== "AN") {
    lq = `${level},AN`;
  }
  let tq = types ? (types.length === 9 ? [] : types) : [];
  return `?id=${numsToStrList(id ?? [])}&tags=${numsToStrList(
    tagIds ?? []
  )}&type=${tq.join(",")}&level=${lq}&search=${
    search ?? ""
  }&ordering=-created_at&page_size=${pageSize ?? 6}`;
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
  const url = API_ROOT + "tags/?page_size=300";
  const response = await axios.get(url);
  const results = response.data.results;
  if (results) {
    return results.filter(isTag).map((i: any) => i as Tag);
  } else {
    throw Error("No results");
  }
}

export async function submitForm(
  content: string,
  formName: string
): Promise<void> {
  const url = API_ROOT + "submit-a-form/";
  const response = await axios.post(url, {
    content: content,
    form_name: formName,
  });
  if (response.status !== 201) {
    throw Error("Error submitting form");
  }
}
