import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import moment from 'moment';

import Header from '../components/Header';
import Footer from '../components/Footer'
import { useGetMyOrdersQuery } from "../redux/api/orderApiSlice"


interface TransformedOrder {
    id: number;
    createdAt: string;
    totalPrice: number;
}

const OrderHistory: React.FC = () => {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState<TransformedOrder[]>()

  const fetchMyOrder = useGetMyOrdersQuery({})

  useEffect(() => {
    if (!fetchMyOrder.isLoading) {
      const transformedArray: TransformedOrder[] = fetchMyOrder.data.data.map((item:any) => ({
        id: item.id,
        createdAt: item.createdAt,
        totalPrice: item.totalPrice
      }));
      
      setOrders(transformedArray)
    }
  }, [fetchMyOrder.data, fetchMyOrder.isLoading, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-xl w-full">
          <h1 className="text-2xl font-semibold mb-4">Order History</h1>
          <div className="mb-4">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="px-4 py-2">Order ID</th>
                  <th className="px-4 py-2">Order Date</th>
                  <th className="px-4 py-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {orders && orders.map((order) => (
                  <tr key={order.id}>
                    <td className="border px-4 py-2">{order.id}</td>
                    <td className="border px-4 py-2">{moment(order.createdAt).format('DD MMMM YYYY, hh:mm:ss A')}</td>
                    <td className="border px-4 py-2">IDR {order.totalPrice.toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderHistory;
