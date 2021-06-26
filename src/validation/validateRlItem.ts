
import ResourceListItem from "../types/ResourceListItem";

export default function validateRlItem(item: ResourceListItem) {
    const { title, detail, url } = item;
    if (title.length > 500) {
        throw Error("Title too long");
    }
    if (detail.length > 3000) {
        throw Error("Detail too long");
    }
    if (url.length > 1000) {
        throw Error("URL too long");
    }
}