import { Type } from "./ResourceRec";

enum MediaType {
  Podcast = "Podcast",
  Book = "Book",
  AudioBook = "Audiobook",
  Blog = "Blog",
  Article = "Article",
  OnlineCourse = "Course",
  FreeVideo = "Video",
  Tool = "Tool",
  Other = "Other",
}

export function mediaTypeFromApiType(apiType: Type) {
  switch (apiType) {
    case "PO":
      return MediaType.Podcast;
    case "BO":
      return MediaType.Book;
    case "AB":
      return MediaType.AudioBook;
    case "BL":
      return MediaType.Blog;
    case "AR":
      return MediaType.Article;
    case "CO":
      return MediaType.OnlineCourse;
    case "VI":
      return MediaType.FreeVideo;
    case "TO":
      return MediaType.Tool;
    case "OT":
      return MediaType.Other;
  }
}

export default MediaType;
