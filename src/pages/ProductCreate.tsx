import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';
import Option from '../components/Option';

import {
  useCreateProductMutation,
  useUploadProductImageMutation
} from "../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"

interface Category {
  id: number;
  name: string;
}

const CreateProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState({
    name: '',
    price: 0,
    stock: 0,
    description: '',
    imageUrl: '',
    categoryId: 0,
  });
  const [categories, setCategories] = useState<Category[]>([])

  const [createProduct, { data, error, isLoading }] = useCreateProductMutation();
  const [uploadProductImage, { data: dataImage, error: errorImage }] = useUploadProductImageMutation();
  const fetchCategories = useFetchCategoriesQuery({});

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append('image', file);

    uploadProductImage(formData)
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    createProduct(productData)
    setProductData({
      name: '',
      price: 0,
      stock: 0,
      description: '',
      imageUrl: '',
      categoryId: 0,
    });
  };

  useEffect(() => {
    if (data?.success || error || isLoading || dataImage?.success || errorImage) {
      if (isLoading) {
        toast.info('Please wait, creating the product');
      } else if (error) {
        toast.error('Something bad happened, please try again');
      } else if (data && data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/'); // Redirect to the homepage
        }, 2000);
      } else if (errorImage) {
        const errorData = errorImage as { data?: { error?: string } }; // Type assertion to narrow down the type
        if (errorData?.data?.error) {
          toast.error(errorData.data.error);
        } else {
          toast.error('An unknown error occurred');
        }
      } else if (dataImage && dataImage.success) {
        toast.success(dataImage.message);
        setProductData({...productData, imageUrl: dataImage.data.downloadURL})
      }
    }
  }, [data, error, isLoading, dataImage, errorImage]);

  useEffect(() => {
    if (!fetchCategories.isLoading) {
      setCategories(fetchCategories.data.data)
    }
  }, [fetchCategories.data, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
          <form onSubmit={handleSubmit}>
            <Input
              id="name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              required
              label='Name'
            />
            <Input
              id="price"
              name="price"
              type='number'
              value={productData.price}
              onChange={handleChange}
              required
              label='Price'
            />
            <Input
              id="stock"
              name="stock"
              type='number'
              value={productData.stock}
              onChange={handleChange}
              required
              label='Stock'
            />
            <Input
              id="description"
              name="description"
              type='textarea'
              value={productData.description}
              onChange={handleChange}
              required
              label='Description'
            />
            <div className="mb-4">
              <label htmlFor="category" className="block text-gray-700">Category</label>
              <Option
                 id="category"
                 name="categoryId"
                 value={productData.categoryId}
                 onChange={handleChange}
                 required
                 datas={categories ? categories : []}
              />
            </div>
            <Input
              type="file"
              id="imageUrl"
              name="imageUrl"
              accept="image/*"
              onChange={handleFileChange}
              required
              label='Image File'
            />
            <Button
              type='submit'
              text='Create Product'
            />
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProductPage;



