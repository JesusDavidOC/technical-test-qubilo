import { configureStore } from "@reduxjs/toolkit";
import RickAndMortyStore from "./RickAndMorty/RickAndMorty"

export const store = configureStore({
  reducer: {
    charactersStore: RickAndMortyStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
