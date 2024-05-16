import { Character } from "@/store/RickAndMorty/types/Character.interface";

export interface CharacterCardProps {
  character: Character
  changeCurrentCharacter(character: Character): void;
}
