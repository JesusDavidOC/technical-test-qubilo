import { RootState } from "@/store";
import "./SidebarFilters.scss";
import { useSelector } from "react-redux";
import {
  addGenderFilter,
  addNameFilter,
  removeGenderFilter,
} from "@/store/RickAndMorty/services";
import { KeyboardEvent, useEffect, useState } from "react";
import { SidebarFiltersProps } from "./SidebarFiltersProps.interface";
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}: Readonly<SidebarFiltersProps>) {
  const { filterCatalogs, filters } = useSelector(
    (state: RootState) => state.charactersStore
  );

  const [nameFilter, setNameFilter] = useState<string>("");

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      addNameFilter(nameFilter);
    }
  }

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  useEffect(() => {
    
    if (nameFilter === "") {
      addNameFilter("");
    }
  }, [nameFilter]);

  return (
    <div className="sidebarFilters" onClick={handleSidebarClose}>
      {sidebarOpen ? (
        <div
          className="sidebarContent"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button className="sidebarButton" onClick={handleSidebarClose}>
            <i className="fa fa-times"></i>
          </button>
          <div id="filterTitle">
            <span className="filterTypeTitle">Filter across the universe!</span>
          </div>
          <div className="filterNameContainer">
            <div id="filterNameTitle">
              <span className="filterByName">Filter by character name</span>
            </div>
            <div id="filterNameForm">
              <input
                id="nameFilter"
                name="nameFilter"
                type="text"
                className="nameFilter"
                placeholder="Name character"
                value={nameFilter}
                onKeyDown={(e) => {
                  handleKeyPress(e);
                }}
                onInput={(e) => setNameFilter(e.target.value)}
              />
              <button
                className="searchButton"
                onClick={() => {
                  addNameFilter(nameFilter);
                }}
              >
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="filterGenderContainer">
            <div id="filterGenderTitle">
              <span className="filterTypeTitle">
                Filter by character gender
              </span>
            </div>
            <div id="buttonsGenders">
              {filterCatalogs.genders
                .filter((gender) => !filters.genders?.includes(gender))
                .map((gender) => (
                  <button
                    className="buttonGender"
                    key={`btnGender${gender}`}
                    onClick={() => {
                      addGenderFilter(gender);
                    }}
                  >
                    {gender}
                  </button>
                ))}
            </div>

            <div className="filtersBadges">
              {filters.genders?.map((gender) => (
                <button
                  className="badge"
                  key={`badgeGender${gender}`}
                  onClick={() => {
                    removeGenderFilter(gender);
                  }}
                >
                  {gender} <i className="fa fa-times"></i>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
