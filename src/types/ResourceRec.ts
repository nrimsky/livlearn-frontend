import MediaType from "./MediaType";

export type Level = "AD" | "IN" | "BE" | "AN";
export const allLevels: Level[] = ["AD", "IN", "BE", "AN"];

export function levelFromAbbr(abbr: Level) {
  switch (abbr) {
    case "AD":
      return "Advanced";
    case "IN":
      return "Intermediate";
    case "BE":
      return "Beginner";
    case "AN":
      return "Any level";
  }
}

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
    case MediaType.Documentation:
      return "DO";
    case MediaType.Forum:
      return "FO";
  }
}

export type Type = "PO" | "BO" | "AB" | "BL" | "AR" | "CO" | "VI" | "TO" | "OT" | "DO" | "FO";
export const allTypes: Type[] = [
  "PO",
  "BO",
  "AB",
  "BL",
  "AR",
  "CO",
  "VI",
  "TO",
  "OT",
  "DO",
  "FO"
];

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
  id: number;
  name: string;
};

export default ResourceRec;
