import React from 'react';
import { useGlobalContext } from '../context';

const Loading = () => {
  const { darkMode } = useGlobalContext();
  return (
    <div className='loader-container'>
      <div
        className={`loader ${
          darkMode ? `bg-white ::` : `bg-darkModeBackground`
        }`}
      ></div>
    </div>
  );
};

export default Loading;
