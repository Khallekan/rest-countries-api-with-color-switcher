import React from "react";
import SearchFilter from "./SearchFilter";
import Loading from "../components/Loading";
import Country from "../components/Country";
import Error from "../components/Error";
import { useGlobalContext } from "../context";
const CountryList = () => {
  const { darkMode, isLoading, countriesList, dispatch } = useGlobalContext();

  return (
    <div
      className={` transition-all duration-500 ease-in-out lg:py-6 lg:px-12 md:py-4 md:px-8 sm:p-6 p-4 ${
        darkMode
          ? `dark-shadow bg-darkModeBackground`
          : `shadow-inner bg-veryLightGray`
      }`}
    >
      <SearchFilter />
      {isLoading && <Loading />}
      {!isLoading && countriesList.length === 0 && <Error />}
      {!isLoading && countriesList.length > 0 && (
        <div
          className={`grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-10 md:gap-4 gap-6 lg:mt-12 mt-6`}
          onClick={() =>
            dispatch({ type: "HANDLE_DROPDOWN_NEW", payload: false })
          }
        >
          {countriesList.map((country, index) => {
            return <Country key={index} {...country} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CountryList;
