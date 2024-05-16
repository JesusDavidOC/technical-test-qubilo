import { RootState } from "@/store";
import "./Catalog.scss";
import { useSelector } from "react-redux";
import CharacterCard from "@/components/CharacterCard/CharacterCard";

import Pagination from "@/components/Pagination/Pagination";
import Header from "@/components/HeaderWithFilters/Header";

export default function Catalog() {
  const { characters, isLoadingCharacters } = useSelector(
    (state: RootState) => state.charactersStore
  );

  return (
    <div>
      <Header />
      <div id="body">
        {!isLoadingCharacters ? (
          <div id="cardsContainer">
            {characters?.map((character) => (
              <CharacterCard
                key={`rickAndMortyCard${character.id}`}
                name={character.name}
                image={character.image}
                extraData={{
                  species: character.species,
                  gender: character.gender,
                }}
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
    </div>
  );
}
