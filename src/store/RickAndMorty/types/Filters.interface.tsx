import { Gender } from "./Genders.enum";

export interface Filters {
  genders?: Gender[];
  name?: string;
  chapters?: number[];
  locations?: number[];
}

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Array<string>;
  url: string;
  created: string;
}

export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: Array<string>;
  url: string;
  created: string;
}
