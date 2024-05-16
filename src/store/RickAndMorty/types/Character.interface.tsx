import { Gender } from "./Genders.enum";

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: Gender;
  origin: { name: string; url: string };
  location: { name: string; url: string };
  image: string;
  episode: Array<string>;
  url: string;
  created: Date | string;
}

export interface CharactersMetadata {
  count: number;
  pages: number;
  next?: string;
  prev?: string;
}
