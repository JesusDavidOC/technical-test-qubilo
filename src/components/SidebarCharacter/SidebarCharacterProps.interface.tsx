import { Character } from "@/store/RickAndMorty/types/Character.interface";

export interface SidebarCharacterProps {
  character: Character | null;
  sidebarOpen: boolean;
  setSidebarOpen(state: boolean): void;
}
