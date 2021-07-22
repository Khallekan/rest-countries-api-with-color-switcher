import React from 'react';
import { useGlobalContext } from '../context';

const Error = () => {
  const { darkMode } = useGlobalContext();

  return (
    <div
      className={`transition-all duration-500 ease-in-out lg:py-6 lg:px-12 md:py-4 md:px-8 sm:p-6 p-4 lg:text-3xl md:text-2xl text-xl text-center ${
        darkMode ? `bg-darkModeBackground text-white` : ` bg-veryLightGray`
      }`}
    >
      No Countries Found
    </div>
  );
};

export default Error;
