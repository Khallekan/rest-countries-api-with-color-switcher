import React, { useRef, useCallback } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useGlobalContext } from "../context";
const SearchBox = () => {
  const { dispatch, darkMode } = useGlobalContext();
  const countryNameRef = useRef(null);

  const fetchSearchCountries = useCallback(async () => {
    const url = `https://restcountries.com/v2/name/${countryNameRef.current.value}`;
    try {
      const resp = await fetch(url);
      if (resp.status === 404) {
        dispatch({ type: `SET_LOADING_FALSE` });
        dispatch({ type: `NO_COUNTRIES_MATCH` });
        return false;
      }
      const data = await resp.json();
      dispatch({ type: `UPDATE_COUNTRIES_LIST`, payload: data });
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch({ type: `SET_LOADING_FALSE` });
    }
    return true;
  }, [dispatch]);

  const handleSearchChange = useCallback(() => {
    dispatch({
      type: `HANLE_SEARCH_INPUT`,
      payload: countryNameRef.current.value,
    });
    fetchSearchCountries();
  }, [dispatch, fetchSearchCountries]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out shadow-md relative h-full lg:w-2/5 md:w-2/4 w-full shadow ${
        darkMode ? `text-white` : `text-lightModeInput`
      }`}
      onClick={() => dispatch({ type: `HANDLE_DROPDOWN_NEW`, payload: false })}
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
