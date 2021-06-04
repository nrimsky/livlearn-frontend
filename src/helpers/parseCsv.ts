import ResourceListItem from "../types/ResourceListItem";
import MediaType from "../types/MediaType";

export default function parseCsv(text: string): ResourceListItem[] {
  const allRows = text.split(/\r?\n|\r/).filter((r) => r !== "");
  const header = allRows[0].split(",");

  const allListItems: ResourceListItem[] = [];
  for (var i = 1; i < allRows.length; i++) {
    var data = allRows[i].split("','");
    if (data.length < header.length) {
        data = allRows[i].split(",");
    }
    var obj: ResourceListItem = {
      title: "",
      type: MediaType.Other,
      detail: "",
      url: "",
      index: i - 1,
    };
    for (var j = 0; j < data.length; j++) {
      const key = header[j];
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        //@ts-ignore
        obj[key] = data[j];
        if (key === "index") {
            obj[key] = parseInt(data[j]);
        }
      }
    }
    allListItems.push(obj);
  }
  return allListItems;
}
