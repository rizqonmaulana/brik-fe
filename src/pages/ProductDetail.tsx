// ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductDetailCard from '../components/ProductDetailCard';

import { useGetProductByIdQuery } from "../redux/api/productApiSlice"
import { useCreateCartMutation } from "../redux/api/cartApiSlice"

interface Product {
    id: number;
    name: string;
    price: number;
    stock: number;
    imageUrl: string;
    description: string;
  }

const ProductDetail: React.FC = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const [product, setProduct] = useState<Product>()

    const fetchProductById = useGetProductByIdQuery(id);

    const [createCart, { data, error }] = useCreateCartMutation();

    useEffect(() => {
        if (!fetchProductById.isLoading) {
          setProduct(fetchProductById.data.data)
        }
    }, [fetchProductById.data, fetchProductById.isLoading, dispatch]);

    useEffect(() => {
        if (data?.success || error) {
          if (error) {
            toast.error('Something bad happened, please try again');
          } else if (data && data.success) {
            toast.success('Product added to cart, please check your cart to order the product');
          }
        }
    }, [data, error]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header name='Rizqon Maulana'/>
                {
                    product ? (
                     <>
                        <ProductDetailCard
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            stock={product.stock}
                            description={product.description}
                            imageUrl={product.imageUrl}
                            onClick={()=>createCart({productId: id})}
                        />
                     </>
                    ) : (
                        <p>Loading...</p>
                    )
                }
            <Footer />
        </div>
    );
};

export default ProductDetail;
