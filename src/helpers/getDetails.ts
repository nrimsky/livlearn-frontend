import ResourceListItem from "../types/ResourceListItem";
import MediaType from "../types/MediaType";

const getDetails = (items: ResourceListItem[]) => {
  const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  const titles = [
    "Podcasts",
    "Books",
    "Audiobooks",
    "Blogs",
    "Articles",
    "Online Courses",
    "Videos",
    "Other",
    "Tools",
  ];
  for (const i of items) {
    switch (i.type) {
      case MediaType.Podcast:
        counts[0]++;
        break;
      case MediaType.Book:
        counts[1]++;
        break;
      case MediaType.AudioBook:
        counts[2]++;
        break;
      case MediaType.Blog:
        counts[3]++;
        break;
      case MediaType.Article:
        counts[4]++;
        break;
      case MediaType.OnlineCourse:
        counts[5]++;
        break;
      case MediaType.FreeVideo:
        counts[6]++;
        break;
      case MediaType.Other:
        counts[7]++;
        break;
      case MediaType.Tool:
        counts[8]++;
        break;
    }
  }
  const parts = [];
  for (let i = 0; i < counts.length; i++) {
    if (counts[i] > 0) {
      parts.push(`${counts[i]} ${titles[i]}`);
    }
  }
  return parts.join(", ");
};

export default getDetails;
