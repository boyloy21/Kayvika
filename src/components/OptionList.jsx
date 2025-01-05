// components/OptionList.js
import React, { useState } from 'react';

const OptionList = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleClick = (option) => {
    setSelectedOption(option.id);
    onSelect(option);
    // console.log("Selected option:", option.label);
  };

  return (
    <ul className="list-none p-0">
      {options.map((option) => (
        <li
          key={option.id}
          className={`p-3 cursor-pointer border border-gray-300 rounded-md my-2 transition-colors duration-200 ${
            selectedOption === option.id
              ? 'bg-blue-500 text-white'
              : 'bg-white text-black hover:bg-gray-100'
          }`}
          onClick={() => handleClick(option)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default OptionList;
