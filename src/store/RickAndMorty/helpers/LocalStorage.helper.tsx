import { Character, CharactersMetadata } from "../types/Character.interface";

export function getStoredContent(page: number): Array<Character> | undefined {
  const item = localStorage.getItem("RickAndMortyCharacters");
  if (!item) return undefined;
  const storedCharacters = JSON.parse(item);
  const characters = storedCharacters[page];
  if (!characters) return undefined;
  return characters;
}

export function saveContent(page: number, characters: Character[]) {
  const item = localStorage.getItem("RickAndMortyCharacters");
  if (item === null) {
    const newCharacters: { [key: number]: Character[] } = {};
    newCharacters[page] = characters;
    localStorage.setItem(
      `RickAndMortyCharacters`,
      JSON.stringify(newCharacters)
    );
  } else {
    const storedCharacters = JSON.parse(item);
    if (!storedCharacters[page]) {
      storedCharacters[page] = characters;
      localStorage.setItem(
        "RickAndMortyCharacters",
        JSON.stringify(storedCharacters)
      );
    }
  }
}

export function saveCharactersMetadata(metadata: CharactersMetadata): void {
  const item = localStorage.getItem("RickAndMortyCharactersMetadata");
  if (item) return;
  localStorage.setItem(
    `RickAndMortyCharactersMetadata`,
    JSON.stringify(metadata)
  );
}

export function getCharactersMetadata(): CharactersMetadata | undefined {
  const item = localStorage.getItem("RickAndMortyCharactersMetadata");
  if (!item) return undefined;
  return JSON.parse(item);
}
