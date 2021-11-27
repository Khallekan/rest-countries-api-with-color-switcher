import React, { useContext, useReducer, useEffect, useCallback } from "react";
import reducer from "./reducer";

const AppContext = React.createContext();

const initialState = {
  darkMode: localStorage.getItem("darkMode") || false,
  searchValue: ``,
  countriesList: [],
  isLoading: true,
  allRegions: [],
  isDropDownOpen: false,
  dropDown: null,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const randomInts = (quantity, max) => {
    const set = new Set();
    while (set.size < quantity) {
      set.add(Math.floor(Math.random() * max));
    }
    return set;
  };

  const getRegions = (data) => {
    const regions = data.reduce((acc, country) => {
      return Array.from(new Set([...acc, country.region]));
    }, []);
    dispatch({ type: "SET_REGIONS", payload: regions });
    return;
  };

  const fetchCountries = useCallback(async () => {
    dispatch({ type: `SET_LOADING_TRUE` });
    const url = `https://restcountries.com/v2/all`;
    try {
      const resp = await fetch(url);
      const data = await resp.json();
      getRegions(await data);
      let randomIndexArray = Array.from(randomInts(20, data.length));
      const countriesArr = Array.from(new Array(20)).map((country, index) => {
        const randomIndex = randomIndexArray[index];
        return (country = data[randomIndex]);
      });
      dispatch({ type: `UPDATE_COUNTRIES_LIST`, payload: countriesArr });
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch({ type: `SET_LOADING_FALSE` });
      return;
    }
  }, []);

  useEffect(() => {
    if (state.darkMode === null) {
      dispatch({ type: `DARK_MODE_FALSE` });
    }
    return;
  }, [state.darkMode]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return (
    <AppContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
