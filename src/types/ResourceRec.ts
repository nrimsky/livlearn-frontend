export type Level = 'AD' | 'IN' | 'BE' | 'AN'

export type Type = "PO" | "BO" | "AB" | "BL" | "AR" | "CO" | "VI" | "TO" | "OT"

type ResourceRec = {
    id: string;
    tags: string[];
    created_at: string; 
    level: Level;
    type: Type;
    url: string;
    description: string;
    tagline: string;
    name: string;
}

export type Tag = {
    id: string;
    name: string;
}

export default ResourceRec;