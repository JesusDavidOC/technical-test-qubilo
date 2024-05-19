import { Filters } from "../types/Filters.interface";

export function getFiltersQuery(filters: Filters) {
  let queryParam = "";
  if (filters.genders && filters.genders.length>0) {
    queryParam = queryParam + `&gender=`;
    for (let index = 0; index < filters.genders.length; index++) {
      queryParam =
        queryParam +
        `${filters.genders[index]}${
          index < filters.genders.length - 1 ? "|" : ""
        }`;
    }
  }
  if (filters.name && filters.name !== "") {
    queryParam = queryParam + `&name=${filters.name}`;
  }
  return queryParam;
}
