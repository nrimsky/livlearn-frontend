import ResourceList from "../types/ResourceList";
import ResourceListItem from "../types/ResourceListItem";

export default function toCsv(resourceList: ResourceList) {
    const rows = resourceList.data.map(i => rlItemToRow(i)).join("\n");
    const header = "index,type,title,detail,url\n";
    return header+rows;
}

const sanitiseText = (text: string) => {
    const t = text.replaceAll(",", "").replaceAll("\n", " ");
    console.log(t);
    return t;
}

const rlItemToRow = (item: ResourceListItem) => {
    const { title, type, detail, url, index} = item;
    return `${index},${type},${sanitiseText(title)},${sanitiseText(detail)},${url}`;
}