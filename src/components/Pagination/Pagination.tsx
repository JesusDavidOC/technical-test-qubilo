import { RootState } from "@/store";
import { setCurrentPage } from "@/store/RickAndMorty/services";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Pagination.scss";

export default function Pagination() {
  const { currentPage, metadata } = useSelector(
    (state: RootState) => state.charactersStore
  );

  const [availablePages, setAvailablePages] = useState<Array<number>>([
    1, 2, 3,
  ]);

  useEffect(() => {
    const newPages: Array<number> = [];
    const pagesSteps = 5;
    if (!metadata) {
      setAvailablePages([]);
      return;
    }
    if (currentPage !== 1 && currentPage !== metadata.pages) {
      newPages.push(currentPage);
    }
    if (metadata.pages < pagesSteps) {
      for (let index = 1; index <= metadata.pages; index++) {
        newPages.push(index);
      }
      setAvailablePages(newPages);
      return;
    }
    for (let index = 1; index < pagesSteps; index++) {
      if (currentPage + index < metadata.pages) {
        newPages.push(currentPage + index);
      }
      if (currentPage - index > 1) {
        newPages.unshift(currentPage - index);
      }
    }
    if (currentPage > pagesSteps && currentPage < metadata.pages - pagesSteps) {
      newPages.push(-2, metadata.pages);
      newPages.unshift(1, -3);
    } else if (currentPage < pagesSteps) {
      newPages.push(-3, metadata.pages);
      newPages.unshift(1);
    } else if (currentPage > metadata.pages - pagesSteps) {
      newPages.push(metadata.pages);
      newPages.unshift(1, -3);
    } else {
      newPages.push(metadata.pages);
      newPages.unshift(1);
    }

    setAvailablePages(newPages);
  }, [currentPage, metadata]);
  return (
    <div>
      {currentPage > 1 ? (
        <button
          className="buttonPagination"
          onClick={() => {
            setCurrentPage(currentPage - 1);
          }}
        >
          &laquo;
        </button>
      ) : (
        ""
      )}
      {availablePages.map((page) => (
        <button
          key={`buttonPagination-${page}`}
          className={`buttonPagination ${page === -3 ? "unusedButton" : ""} ${
            page === currentPage ? "activeButton" : ""
          }`}
          onClick={(ev) => {
            if (page > 0) {
              setCurrentPage(page);
            } else {
              ev.preventDefault();
            }
          }}
        >
          {page < 0 ? "..." : page}
        </button>
      ))}
      {currentPage < metadata?.pages ? (
        <button
          className="buttonPagination"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          &raquo;
        </button>
      ) : (
        ""
      )}
    </div>
  );
}
