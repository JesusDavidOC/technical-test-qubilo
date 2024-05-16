import { RickAndMortyStore } from "./RickAndMorty";

export const {
  setLoading,
  setCharacters,
  setPage,
  setCharactersMetadata,
  updateFilters,
  pushGendersCatalogs,
  pushLocationsCatalogs,
  pushEpisodesCatalogs,
  saveContent,
} = RickAndMortyStore.actions;
