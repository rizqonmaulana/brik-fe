import React from 'react';

import { Props } from './index.d';

const ProductDetailCard: React.FC<Props> = ({id, name, imageUrl, description, price, stock, onClick}) => {
  return (
    <div className="flex-grow flex p-6">
        <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-5 mt-10">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img className="h-64 w-full object-cover md:w-64" src={imageUrl} alt={name} />
                </div>
                <div className="p-8">
                    <div className="uppercase tracking-wide text-sm text-green-600 font-semibold">{name}</div>
                    <p className="mt-2 text-gray-500">{description}</p>
                    <div className="mt-4">
                        <span className="text-gray-900 font-bold text-xl">IDR {price.toLocaleString('id-ID')}</span>
                        <span className="ml-4 text-gray-600 text-sm">Stock: {stock}</span>
                    </div>
                    <button onClick={onClick} className="mt-6 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductDetailCard;
