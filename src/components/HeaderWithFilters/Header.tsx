import { RootState } from "@/store";
import "./Header.scss";
import { useSelector } from "react-redux";
import {
  addGenderFilter,
  addNameFilter,
  removeGenderFilter,
} from "@/store/RickAndMorty/services";
import { useState } from "react";

export default function Catalog() {
  const { filterCatalogs, filters } = useSelector(
    (state: RootState) => state.charactersStore
  );

  const [nameFilter, setNameFilter] = useState<string>("");

  return (
    <div>
      <header id="header">
        <div className="filterNameContainer">
          <input
            id="nameFilter"
            name="nameFilter"
            type="text"
            className="nameFilter"
            placeholder="Name character"
            value={nameFilter}
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
        <div className="filterGenderContainer">
          <div className="dropdown">
            <button className="dropbtn">Select gender</button>
            <div className="dropdown-content">
              {filterCatalogs.genders
                .filter((gender) => !filters.genders?.includes(gender))
                .map((gender) => (
                  <button
                    className="buttonGenderSelector"
                    key={`btnGender${gender}`}
                    onClick={() => {
                      addGenderFilter(gender);
                    }}
                  >
                    {gender}
                  </button>
                ))}
            </div>
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
      </header>
    </div>
  );
}
