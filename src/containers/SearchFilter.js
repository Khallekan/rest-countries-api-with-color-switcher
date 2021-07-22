import React from 'react';
import SearchBox from '../components/SearchBox';
import FilterBox from '../components/FilterBox';
const SearchFilter = () => {
  return (
    <div
      className={`flex lg:flex-row md:flex-row lg:justify-between md:justify-between sm:flex-col flex-col transition-all duration-500 ease-in-out lg:h-12 md:h-14 md:gap-0 gap-4 h-24  lg:text-xl md:text-xl sm:text-lg text-sm`}
    >
      <SearchBox />
      <FilterBox />
    </div>
  );
};

export default SearchFilter;
