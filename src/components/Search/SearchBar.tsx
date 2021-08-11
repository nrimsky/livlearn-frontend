import { FilterIcon, SearchIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Query } from "../../api/LivlearnApi";

type Props = {
  onSearch: (q: Query) => void;
  onClickFilter: () => void;
  className?: string;
};

const SearchBar = ({ onSearch, className, onClickFilter }: Props) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onPressSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSearch({ search: searchQuery });
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={"flex flex-row mb-3 mx-4 md:mx-0 items-center " + className}>
      <form className="relative max-w-2xl text-gray-900 dark:text-white inline-flex mr-4 w-full">
        <input
          className="bg-white dark:bg-gray-900 h-10 px-3 pr-16 rounded focus:outline-none w-full focus:ring-4"
          name="search"
          onChange={onSearchChange}
          value={searchQuery}
          placeholder="Search"
        />
        <button
          type="submit"
          className="absolute right-0 top-0 mt-3 mr-3 focus:outline-none focus:ring focus:ring-green-200 focus:ring-opacity-50"
          onClick={onPressSearch}
          aria-label="Search"
        >
          <SearchIcon className="text-gray-500  dark:text-gray-400 h-4 w-4 gap-1" />
        </button>
      </form>

      <button
        className="text-white bg-green-500 bg-gradient-to-b dark:from-green-500 dark:to-green-600 dark:border-green-600 rounded-full w-9 h-9 md:hidden"
        onClick={onClickFilter}
      >
        <FilterIcon className="w-5 h-5 m-2"/>
      </button>
    </div>
  );
};

export default SearchBar;
