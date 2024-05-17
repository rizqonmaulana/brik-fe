import React from 'react';
import { Props } from './props';

const Card: React.FC<Props> = ({ id, name, imageUrl, price, stock, onClick }) => {
  return (
    <div className="bg-white shadow-md rounded-lg cursor-pointer hover:bg-green-200 transition duration-300 ease-in-out" onClick={onClick}>
      <img src={imageUrl ? imageUrl : `https://via.placeholder.com/150?text=${name}`} alt="Product" className="w-full rounded-t-lg h-52" />
      <div className='p-4'>
        <h3 className="text-gray-600">{name && name.length <= 30 ? name : name.slice(0, 30) + "..."}</h3>
        <p className="font-semibold">IDR {price.toLocaleString('id-ID')}</p>
        <p className="text-gray-400 text-sm">{stock} items available</p>
      </div>
    </div>
  );
};

export default Card;
