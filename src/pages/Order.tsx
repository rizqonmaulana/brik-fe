import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

import { RootState } from '../redux/store'
import { useGetMyChartsQuery } from "../redux/api/cartApiSlice"
import { useCreateOrderMutation } from "../redux/api/orderApiSlice"

interface TransformedProduct {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const CreateOrderPage = () => {
  const { userInfo } = useSelector((state:RootState) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [carts, setCarts] = useState<TransformedProduct[]>()

  const fetchMyCart = useGetMyChartsQuery({})
  const [createOrder, { data, error, isLoading }] = useCreateOrderMutation();

  // Calculate total price
  const totalPrice = carts && carts.reduce((total, product) => total + product.price * product.quantity, 0);

  // Handle order button click
  const handleOrderClick = () => {
    const dataOrder = {
      userId: userInfo?.id,
      products: carts
    }

    createOrder(dataOrder)
  };

  useEffect(() => {
    if (!fetchMyCart.isLoading) {
      const transformedArray: TransformedProduct[] = fetchMyCart.data.data.map((item:any) => ({
        id: item.id,
        productId: item.productId,
        name: item.Product.name,
        price: item.Product.price,
        quantity: item.quantity,
        imageUrl: item.Product.imageUrl
      }));
      
      setCarts(transformedArray)
    }
  }, [fetchMyCart.data, fetchMyCart.isLoading, dispatch]);

  useEffect(() => {
    if (data?.success || error) {
      if (error) {
        toast.error('Something bad happened, please try again');
      } else if (data && data.success) {
        toast.success('Order Success');
        setTimeout(() => {
          navigate('/order/history')
        }, 1500);
      }
    }
  }, [data, error]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">Create Order</h1>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">My Cart</h2>
            <ul>
              { carts && (
                carts.map(product => (
                  <li key={product.id} className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <img src={product.imageUrl} alt={product.name} className="w-12 h-12 mr-4 rounded" />
                      <div>
                        <span>{product.name}</span>
                        <span className="text-gray-500"> x {product.quantity} @{product.price}</span>
                      </div>
                    </div>
                    <span>IDR {(product.price * product.quantity).toLocaleString('id-ID')}</span>
                  </li>
                ))
              )}
            </ul>
          </div>
          <div className="mb-4">
            <div className="flex justify-between">
              <span className="font-semibold">Total Price:</span>
              <span>IDR {totalPrice ? totalPrice.toLocaleString('id-ID') :  '-'}</span>
            </div>
          </div>
          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out"
            onClick={handleOrderClick}
          >
            Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateOrderPage;
