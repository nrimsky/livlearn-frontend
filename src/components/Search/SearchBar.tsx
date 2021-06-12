import { SearchIcon } from "@heroicons/react/outline";
import React, { useState, useCallback } from "react";
import { Query } from "../../api/LivlearnApi";
import classNames from "../../helpers/classNames";
import MediaType from "../../types/MediaType";
import { Level, Type, typeFromMediaType } from "../../types/ResourceRec";
import LevelMenu from "./LevelMenu";

function enumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

type Props = {
  query: Query;
  onSearch: (q: Query) => void;
  className?: string;
};

const SearchBar = ({ query, onSearch, className}: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onCheckMediaType = useCallback(
    (m: Type) => {
      const mts = query.types;
      if (mts.includes(m)) {
        onSearch({ ...query, types: mts.filter((i) => i !== m) });
      } else {
        onSearch({ ...query, types: [...mts, m] });
      }
    },
    [onSearch, query]
  );

  const onSelectLevel = useCallback((level: Level) => {
    onSearch({
      ...query,
      level: level,
    });
  }, [onSearch, query]);

  const onPressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch({ ...query, search: searchQuery });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div
      className={classNames(
        "text-gray-500 flex-none flex flex-col md:flex-row px-4 md:px-0 w-100 flex-wrap",
        className ?? ""
      )}
    >
      <form className="relative max-w-sm">
        <input
          className="border border-gray-300 bg-white h-10 px-3 pr-16 rounded focus:outline-none w-full focus:outline-none focus:ring-4 focus:ring-green-200 focus:ring-opacity-50 focus:outline-none focus:bg-white bg-white"
          name="search"
          onChange={onSearchChange}
          value={searchQuery}
          placeholder="Search"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-3 focus:outline-none"
          onClick={onPressSearch}
        >
          <SearchIcon className="text-gray-500 h-4 w-4 gap-1" />
        </button>
      </form>
      <form>
        <fieldset className="grid grid-rows-3 md:grid-rows-2 pt-3 md:pt-0 max-w-sm grid-flow-col gap-x-2 gap-y-1 md:px-5">
          {enumKeys(MediaType).map((v) => {
            return (
              <div
                className="text-xs inline-flex items-center tracking-tight align-center"
                key={v}
              >
                <input
                  id={MediaType[v]}
                  name={MediaType[v]}
                  onChange={() =>
                    onCheckMediaType(typeFromMediaType(MediaType[v]))
                  }
                  type="checkbox"
                  checked={query.types.includes(
                    typeFromMediaType(MediaType[v])
                  )}
                />
                <label htmlFor={MediaType[v]} className="ml-1 text-gray-900">
                  {MediaType[v]}s
                </label>
              </div>
            );
          })}
        </fieldset>
      </form>
      <form className="pt-1">
        <LevelMenu selected={query.level} onSelect={onSelectLevel} />
      </form>
    </div>
  );
};

export default SearchBar;