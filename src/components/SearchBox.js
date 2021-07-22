import React, { useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { useGlobalContext } from '../context';
const SearchBox = () => {
  const { dispatch, darkMode } = useGlobalContext();
  const countryNameRef = useRef(null);

  const handleSearchChange = () => {
    dispatch({
      type: `HANLE_SEARCH_INPUT`,
      payload: countryNameRef.current.value,
    });
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out shadow-md relative h-full lg:w-2/5 md:w-2/4 w-full shadow ${
        darkMode ? `text-white` : `text-lightModeInput`
      }`}
    >
      <input
        type='text'
        name='country-name'
        className={`transition-all duration-500 ease-in-out w-full h-full search outline-none ${
          darkMode ? `bg-darkBlue` : `bg-white`
        } `}
        ref={countryNameRef}
        placeholder='Search for a country'
        onChange={handleSearchChange}
      />
      <AiOutlineSearch
        className={`absolute center-search cursor-pointer`}
        onClick={() => countryNameRef.current.focus()}
      />
    </div>
  );
};

export default SearchBox;
