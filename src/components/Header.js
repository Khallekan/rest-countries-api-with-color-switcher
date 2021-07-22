import React from 'react';
import { BsMoon } from 'react-icons/bs';
import { BiMoon } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context';
const Header = () => {
  const { darkMode, dispatch } = useGlobalContext();

  const handleDarkMode = () => {
    return dispatch({ type: `HANDLE_DARK_MODE` });
  };

  return (
    <header
      className={`transition-all duration-500 ease-in-out lg:py-6 lg:px-12 md:py-4 md:px-8 sm:p-6 p-4 flex flex-row justify-between ${
        darkMode
          ? `text-white bg-darkBlue`
          : `text-lightModeText border-transparent`
      }`}
    >
      <Link
        to='/'
        className={`cursor-pointer font-bold lg:text-2xl md:text-lg sm:text-lg text-sm inline-block align-middle `}
      >
        Where in the world?
      </Link>
      <div
        className={`cursor-pointer flex flex-row items-center gap-0.5 md:gap-1 lg:gap-2 lg:text-lg md:text-lg sm:text-lg text-sm font-semibold`}
        onClick={handleDarkMode}
      >
        {darkMode ? <BsMoon /> : <BiMoon />}
        <span>{darkMode ? `Dark Mode` : `Light Mode`}</span>
      </div>
    </header>
  );
};

export default Header;
