import MediaType from "./MediaType";

export type Level = "AD" | "IN" | "BE" | "AN";

export function typeFromMediaType(mt: MediaType) {
  switch (mt) {
    case MediaType.Podcast:
      return "PO";
    case MediaType.Book:
      return "BO";
    case MediaType.AudioBook:
      return "AB";
    case MediaType.Blog:
      return "BL";
    case MediaType.Article:
      return "AR";
    case MediaType.OnlineCourse:
      return "CO";
    case MediaType.FreeVideo:
      return "VI";
    case MediaType.Tool:
      return "TO";
    case MediaType.Other:
      return "OT";
  }
}

export type Type = "PO" | "BO" | "AB" | "BL" | "AR" | "CO" | "VI" | "TO" | "OT";

type ResourceRec = {
  id: number;
  tags: string[];
  created_at: string;
  level: Level;
  type: Type;
  url: string;
  description: string;
  tagline: string;
  name: string;
};

export type Tag = {
  id: string;
  name: string;
};

export default ResourceRec;
