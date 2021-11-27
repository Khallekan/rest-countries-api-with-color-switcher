import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const Country = ({ name, flag, demonym, population, region, capital }) => {
  const { darkMode } = useGlobalContext();

  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Link
      to={`/${name}`}
      className={`shadow transition-all duration-500 ease-in-out lg:h-96 grid md:h-80 h-auto grid-rows-2 lg:w-full md:w-full w-10/12 mx-auto ${
        darkMode ? `bg-darkBlue text-white` : `bg-white text-lightModeText`
      }`}
    >
      <div className='h-full'>
        <img
          src={flag}
          alt={`${demonym} flag`}
          className={`w-full h-full object-cover`}
        />
      </div>
      <section className='lg:p-6 lg:py-10 p-4'>
        <h1 className='font-bold mb-2 md:text-base'>{name}</h1>
        <p>
          <span className='font-semibold font-sm'>Population:</span>{" "}
          {numberWithCommas(population)}
        </p>
        <p>
          <span className='font-semibold font-sm'>Region:</span> {region}
        </p>
        <p>
          <span className='font-semibold font-sm'>Capital:</span> {capital}
        </p>
      </section>
    </Link>
  );
};

export default Country;
