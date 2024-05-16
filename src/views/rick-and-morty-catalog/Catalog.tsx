import { RootState } from "@/store";
import "./Catalog.scss";
import { useSelector } from "react-redux";
import CharacterCard from "@/components/CharacterCard/CharacterCard";

import Pagination from "@/components/Pagination/Pagination";
import HeaderFilters from "@/components/Header/Header";
import SidebarCharacter from "@/components/SidebarCharacter/SidebarCharacter";
import SidebarFilters from "@/components/SidebarFilters/SidebarFilters";
import { Character } from "@/store/RickAndMorty/types/Character.interface";
import { useState } from "react";

export default function Catalog() {
  const { characters, isLoadingCharacters } = useSelector(
    (state: RootState) => state.charactersStore
  );

  const [sidebarCharacterOpen, setSidebarCharacterOpen] =
    useState<boolean>(false);
  const [sidebarFiltersOpen, setSidebarFiltersOpen] = useState<boolean>(false);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );

  function changeCurrentCharacter(character: Character) {
    setCurrentCharacter(character);
    setSidebarCharacterOpen(true);
  }

  function openFilters(status: boolean) {
    setSidebarFiltersOpen(status);
  }

  return (
    <div>
      <HeaderFilters setSidebarFiltersOpen={openFilters} />
      <div id="body">
        {!isLoadingCharacters ? (
          <div id="cardsContainer">
            {characters?.map((character) => (
              <CharacterCard
                key={`rickAndMortyCard${character.id}`}
                character={character}
                changeCurrentCharacter={changeCurrentCharacter}
              />
            ))}
          </div>
        ) : (
          <div id="spinnerContainer">
            <div className="loader"></div>
          </div>
        )}
        <div id="pagination">
          <Pagination />
        </div>
      </div>
      {sidebarCharacterOpen ? (
        <SidebarCharacter
          sidebarOpen={sidebarCharacterOpen}
          character={currentCharacter}
          setSidebarOpen={setSidebarCharacterOpen}
        />
      ) : (
        ""
      )}
      {sidebarFiltersOpen ? (
        <SidebarFilters
          sidebarOpen={sidebarFiltersOpen}
          setSidebarOpen={setSidebarFiltersOpen}
        />
      ) : (
        ""
      )}
    </div>
  );
}
