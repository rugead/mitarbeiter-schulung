import React, {Fragment}from 'react';

export const InputField = (props) => {
  const { label, type, name, value, id, disabled, placeholder, onChange} = props
  return (
    <Fragment>
        <label htmlFor="displayName" className="pl-3 flex-shrink w-60 ">
          <span className="">{label}</span>
        </label>

        <div className="pl-3 pb-5 flex items-start">
          <input 
            type={type}
            className="p-2 bg-green-100 w-full disabled:bg-gray-100 text-black disabled:text-gray-400 border border-gray-300 rounded-md"
            name={name}
            value={value}
            id={id}
            placeholder={placeholder}
            onChange={onChange} 
            disabled={disabled} 
            autoComplete="current-password"
          />
      </div>
    </Fragment> 
  );
}
 
// export InputField;