import React from 'react';

export const Button = (props) => {
  const { name, onClick, label, type } = props
  return ( 
    <button 
      className=" p-2 m-3 text-primary hover:text-gray-200 hover:bg-primary border border-primary rounded-md" 
      type={type}
      name={name} 
      onClick={onClick} 
    >
    {label}
    </button>
   );
}
