import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white bg-opacity-75 z-50">
      <FontAwesomeIcon icon={faSpinner} spin className="text-gray-800 text-5xl" />
    </div>
  );
};

export default Loading;