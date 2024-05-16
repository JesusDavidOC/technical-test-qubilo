import { Episode } from "@/store/RickAndMorty/types/Filters.interface";
import "./SidebarCharacter.scss";
import { SidebarCharacterProps } from "./SidebarCharacterProps.interface";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function SidebarCharacter({
  character,
  sidebarOpen,
  setSidebarOpen,
}: Readonly<SidebarCharacterProps>) {
  const { filterCatalogs } = useSelector(
    (state: RootState) => state.charactersStore
  );

  const [currentEpisodes, setCurrentEpisodes] = useState<Array<Episode>>([]);

  useEffect(() => {
    if (character) {
      const episodesComplete: Episode[] = [];
      character.episode.forEach((episode) => {
        const episodeTemp = filterCatalogs.episodes.find(
          (filterEpisode) => filterEpisode.url === episode
        );
        if (episodeTemp) {
          episodesComplete.push(episodeTemp);
        }
      });
      if (episodesComplete) {
        setCurrentEpisodes(episodesComplete);
      }
    }
  }, [character, filterCatalogs.episodes]);

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="sidebarCharacter" onClick={handleSidebarClose}>
      {sidebarOpen && character ? (
        <div
          className="sidebarContent"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button className="sidebarButton" onClick={handleSidebarClose}>
            <i className="fa fa-times"></i>
          </button>
          <div className="characterImage">
            <img src={character.image} alt="characterPhoto" />
          </div>
          <div className="characterName">
            <span>{character.name}</span>
          </div>
          <div className="characterDescription">
            <div className="descriptionItem">
              <div className="labelDescription">Status</div>
              <div className="valueDescription">
                {character.status !== "" ? character.status : "Unknown"}
              </div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Species</div>
              <div className="valueDescription">
                {character.species !== "" ? character.species : "Unknown"}
              </div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Gender</div>
              <div className="valueDescription">{character.gender}</div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Type</div>
              <div className="valueDescription">
                {character.type !== "" ? character.type : "Unknown"}
              </div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Origin</div>
              <div className="valueDescription">
                {character.origin.name !== ""
                  ? character.origin.name
                  : "Unknown"}
              </div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Location</div>
              <div className="valueDescription">
                {character.location.name !== ""
                  ? character.location.name
                  : "Unknown"}
              </div>
            </div>
            <div className="descriptionItem">
              <div className="labelDescription">Status</div>
              <div className="valueDescription">{character.status}</div>
            </div>
          </div>

          {currentEpisodes.length > 0 ? (
            <div className="characterEpisodes">
              <div id="label">
                <span>
                  Episodes <i className="fa fa-sort-down"></i>
                </span>
              </div>
              {currentEpisodes.map((episode, index) => (
                <div
                  key={`${episode.name} - ${episode.episode} - ${index}`}
                  className="episode"
                >
                  <span className="episodeName">
                    {episode.name} - {episode.episode}
                  </span>
                  <span className="episodeDate">{episode.air_date}</span>
                </div>
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
