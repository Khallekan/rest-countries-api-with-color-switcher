import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
import Loading from "./Loading";
import { BsArrowLeft } from "react-icons/bs";

const SingleCountry = () => {
  const { name } = useParams();
  const { darkMode } = useGlobalContext();
  const [countryData, setCountryData] = useState({});
  const [borderNames, setBorderNames] = useState([]);

  const {
    flag,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    languages,
    demonym,
  } = countryData;

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const fetchCodeCountries = useCallback(async (code) => {
    const url = `https://restcountries.com/v2/alpha/${code}`;
    let countryName;
    try {
      const resp = await fetch(url),
        data = await resp.json();
      countryName = await data.name;
      return await countryName;
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const fetchSingleCountry = useCallback(
    async (name) => {
      setBorderNames([]);
      const url = `https://restcountries.com/v2/name/${name}`;
      try {
        const resp = await fetch(url);
        const data = await resp.json();
        setCountryData(data[0]);
      } catch (error) {
        throw new Error(error);
      }
      return;
    },
    [setBorderNames]
  );

  useEffect(() => {
    fetchSingleCountry(name);
  }, [name, fetchSingleCountry]);

  useEffect(() => {
    if (Object.keys(countryData).length === 0) {
      return;
    }

    const { borders } = countryData;

    if (borders === undefined || borders.length === 0) return;
    borders.map(async (border) => {
      const newBorderName = await fetchCodeCountries(border);
      setBorderNames((oldState) => {
        return [...oldState, newBorderName];
      });
    });
  }, [countryData, fetchCodeCountries]);

  if (Object.keys(countryData).length === 0) {
    return <Loading />;
  }
  return (
    <div
      className={`transition-all duration-500 ease-in-out lg:py-6 lg:px-12 md:py-4 md:px-8 sm:p-6 p-4 ${
        darkMode
          ? `dark-shadow bg-darkModeBackground text-white`
          : `shadow-inner bg-veryLightGray text-lightModeText`
      }`}
    >
      <Link
        to='/'
        className={`flex flex-row items-center gap-4 sm:p-4 p-2 lg:w-2/12 md:w-2/12 sm:w-3/12 w-2/6 shadow dark:shadow ${
          darkMode ? `bg-darkBlue text-white` : `bg-white text-lightModeText`
        }`}
      >
        <BsArrowLeft /> <span>Back</span>
      </Link>
      <div className={`mt-10 flex md:flex-row flex-col md:gap-12 gap-12`}>
        <div className='md:h-full h-auto md:min-w-2/5 md:w-3/6'>
          <img
            src={flag}
            alt={`${demonym} flag`}
            className={`md:h-full h-auto`}
          />
        </div>
        <section
          className={`flex flex-col md:gap-0 gap-6 md:justify-center md:w-3/6 lg:p-6`}
        >
          <h2 className={`font-bold lg:text-2xl text-lg`}>{name}</h2>
          <div
            className={`lg:text-lg text-base md:mt-8 flex md:flex-row flex-col md:gap-0 gap-10 `}
          >
            <div className={`flex flex-col md:gap-2 gap-1 md:w-3/6`}>
              <p>
                <span className={`font-semibold`}>Native Name:</span>{" "}
                {nativeName}
              </p>
              <p>
                <span className={`font-semibold`}>Population:</span>{" "}
                {numberWithCommas(population)}
              </p>
              <p>
                <span className={`font-semibold`}>Region:</span> {region}
              </p>
              <p>
                <span className={`font-semibold`}>Sub Region:</span> {subregion}
              </p>
              <p>
                <span className={`font-semibold`}>Capital:</span> {capital}
              </p>
            </div>
            <div className={`flex flex-col md:gap-2 gap-1 md:w-3/6`}>
              <p>
                <span className={`font-semibold`}>Top Level Domain:</span>{" "}
                {topLevelDomain}
              </p>
              <p>
                <span className={`font-semibold`}>Currencies:</span>{" "}
                {currencies
                  .map((currency) => {
                    return currency.name;
                  })
                  .join(", ")}
              </p>
              <p>
                <span className={`font-semibold`}>Languages:</span>{" "}
                {languages
                  .map((language) => {
                    return language.name;
                  })
                  .join(", ")}
              </p>
            </div>
          </div>
          <div className={`lg:text-lg md:text-base lg:mt-12 md:mt-6`}>
            <span className={`font-semibold`}>Border Countries: </span>{" "}
            {borderNames.length === 0 ? (
              `Not available`
            ) : (
              <span className={`flex flex-row gap-2 flex-wrap`}>
                {borderNames.map((border, index) => {
                  return (
                    <Link
                      to={`/${border}`}
                      key={index}
                      className={`p-2 shadow dark:shadow ${
                        darkMode
                          ? `bg-darkBlue text-white`
                          : `bg-white text-lightModeText`
                      }`}
                    >
                      {border}
                    </Link>
                  );
                })}
              </span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SingleCountry;
