import React from 'react';
import { Props } from './index.d';

const Button: React.FC<Props> = ({ type, text, onClick, style }) => {
  return (
    <button type={type === "submit" || type === "reset" ? type : "button"} onClick={onClick} className={`w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out ${style}`}>
      {text}
    </button>
  );
};

export default Button;
