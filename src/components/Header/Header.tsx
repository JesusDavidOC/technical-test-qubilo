import "./Header.scss";
import { HeaderProps } from "./HeaderProps.interface";

export default function HeaderFilters({
  setSidebarFiltersOpen,
}: Readonly<HeaderProps>) {
  return (
    <div>
      <header id="header">
        <div id="pagePresentation">
          <img src="/images/pageLogo.jpeg" alt="pageLogo" />
          <span id="pageTitle">Rick and Morty API</span>
        </div>
        <div id="filters">
          <button
            className="buttonHandleFilters"
            onClick={() => {
              setSidebarFiltersOpen(true);
            }}
          >
            Filter universe<i className="fa fa-filter"></i>
          </button>
        </div>
      </header>
    </div>
  );
}
