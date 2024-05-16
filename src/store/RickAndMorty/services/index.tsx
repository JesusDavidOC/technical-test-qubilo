import {
  setLoading,
  setCharacters,
  setPage,
  setCharactersMetadata,
  pushEpisodesCatalogs,
  pushLocationsCatalogs,
  pushGendersCatalogs,
  updateFilters,
} from "../RickAndMorty.actions.tsx";
import { getFiltersQuery } from "../helpers/Request.helpers.tsx";
import { store } from "@/store/index.tsx";
import { CharactersMetadata } from "../types/Character.interface.tsx";
import { Episode, Location } from "../types/Filters.interface.tsx";
import { Gender } from "../types/Genders.enum.tsx";

export function getByCurrentState() {
  store.dispatch(setLoading(true));
  const { filters, currentPage } = store.getState().charactersStore;
  const filtersQuery = getFiltersQuery(filters);
  fetch(
    `https://rickandmortyapi.com/api/character/?page=${currentPage}${filtersQuery}`,
    { method: "GET" }
  )
    .then((response) => response.json())
    .then((data) => {
      store.dispatch(setCharacters(data.results));
      store.dispatch(setCharactersMetadata(data.info));
      store.dispatch(setLoading(false));
    })
    .catch((error) => console.error(error));
}

export function setCurrentPage(page: number) {
  store.dispatch(setPage(page));
  getByCurrentState();
}

export function loadCatalogs() {
  store.dispatch(setLoading(true));
  fetch(`https://rickandmortyapi.com/api/location`, { method: "GET" })
    .then((response) => response.json())
    .then((data: { info: CharactersMetadata; results: Location[] }) => {
      store.dispatch(
        pushLocationsCatalogs({ locations: data.results, reset: true })
      );
      for (let index = 2; index <= data.info.pages; index++) {
        fetch(`https://rickandmortyapi.com/api/location?page=${index}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data: { info: CharactersMetadata; results: Location[] }) => {
            store.dispatch(
              pushLocationsCatalogs({ locations: data.results, reset: false })
            );
          })
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));

  fetch(`https://rickandmortyapi.com/api/episode`, { method: "GET" })
    .then((response) => response.json())
    .then((data: { info: CharactersMetadata; results: Array<Episode> }) => {
      store.dispatch(
        pushEpisodesCatalogs({ episodes: data.results, reset: true })
      );
      for (let index = 2; index <= data.info.pages; index++) {
        fetch(`https://rickandmortyapi.com/api/episode?page=${index}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then(
            (data: { info: CharactersMetadata; results: Array<Episode> }) => {
              store.dispatch(
                pushEpisodesCatalogs({ episodes: data.results, reset: false })
              );
            }
          )
          .catch((error) => console.error(error));
      }
    })
    .catch((error) => console.error(error));

  const genderOptions: Gender[] = Object.keys(Gender) as Gender[];

  store.dispatch(pushGendersCatalogs({ genders: genderOptions, reset: true }));
}

export function addGenderFilter(gender: Gender) {
  const { filters } = store.getState().charactersStore;
  store.dispatch(
    updateFilters({
      genders: filters.genders ? [...filters.genders, gender] : [gender],
    })
  );
  store.dispatch(setPage(1));
  getByCurrentState();
}

export function removeGenderFilter(gender: Gender) {
  const { filters } = store.getState().charactersStore;
  store.dispatch(
    updateFilters({
      genders: filters.genders?.filter(
        (genderAtr: Gender) => genderAtr !== gender
      ),
    })
  );
  store.dispatch(setPage(1));
  getByCurrentState();
}

export function addNameFilter(name: string) {
  store.dispatch(
    updateFilters({
      name: name,
    })
  );
  store.dispatch(setPage(1));
  getByCurrentState();
}
