import React from 'react';

export const Title = ({children}) => {
  return ( 
    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl text-gray-200 pb-5">
      {children}
    </h1>
   );
}