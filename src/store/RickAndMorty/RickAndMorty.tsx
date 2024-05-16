import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Character, CharactersMetadata } from "./types/Character.interface";

import { Episode, Filters, Location } from "./types/Filters.interface";
import { Gender } from "./types/Genders.enum";

export interface RickAndMortyState {
  characters: Array<Character>;
  currentPage: number;
  isLoadingCharacters: boolean;
  filters: Filters;
  metadata: CharactersMetadata;
  filterCatalogs: {
    genders: Array<Gender>;
    locations: Array<Location>;
    episodes: Array<Episode>;
  };
  storedContent: { [key: number]: Character[] };
}

const initialState: RickAndMortyState = {
  characters: [],
  currentPage: 1,
  isLoadingCharacters: false,
  filters: {
    genders: [],
    name: "",
  },
  metadata: { count: 0, pages: 0 },
  filterCatalogs: {
    genders: [],
    locations: [],
    episodes: [],
  },
  storedContent: {},
};

export const RickAndMortyStore = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters(state, characters: PayloadAction<Array<Character>>) {
      state.characters = characters.payload;
    },
    pushGendersCatalogs(
      state,
      catalog: PayloadAction<{ genders: Array<Gender>; reset: boolean }>
    ) {
      if (catalog.payload.reset) {
        state.filterCatalogs.genders = [];
      }
      state.filterCatalogs.genders.push(...catalog.payload.genders);
    },
    pushLocationsCatalogs(
      state,
      catalog: PayloadAction<{ locations: Array<Location>; reset: boolean }>
    ) {
      if (catalog.payload.reset) {
        state.filterCatalogs.locations = [];
      }
      state.filterCatalogs.locations.push(...catalog.payload.locations);
    },
    pushEpisodesCatalogs(
      state,
      catalog: PayloadAction<{ episodes: Array<Episode>; reset: boolean }>
    ) {
      if (catalog.payload.reset) {
        state.filterCatalogs.episodes = [];
      }
      state.filterCatalogs.episodes.push(...catalog.payload.episodes);
    },
    setLoading(state, isLoading: PayloadAction<boolean>) {
      state.isLoadingCharacters = isLoading.payload;
    },
    setPage: (state, page: PayloadAction<number>) => {
      state.currentPage = page.payload;
    },
    setCharactersMetadata: (
      state,
      metadata: PayloadAction<CharactersMetadata>
    ) => {
      state.metadata = metadata.payload;
    },
    updateFilters: (state, filters: PayloadAction<Filters>) => {
      state.filters = { ...state.filters, ...filters.payload };
    },
    saveContent(
      state,
      content: PayloadAction<{ page: number; characters: Character[] }>
    ) {
      state.storedContent[content.payload.page] = content.payload.characters;
    },
  },
});

// Action creators are generated for each case reducer function

export default RickAndMortyStore.reducer;
