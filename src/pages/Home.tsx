import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Option from '../components/Option';
import Pagination from '../components/Pagination'
import Input from '../components/Input';
import Button from '../components/Button'

import { useGetProductsQuery } from "../redux/api/productApiSlice"
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice"

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  imageUrl: string;
}

interface Page {
  page: number;
  limit: number;
  totalData: number,
  totalPage: number
}

interface Category {
  id: number;
  name: string;
}

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1)
  const [limit] = useState(15)
  const [sort, setSort] = useState("")
  const [name, setName] = useState("")
  const [categoryId, setCategoryId] = useState(0)
  const [pagination, setPagination] = useState<Page>()

  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const { data, isLoading, error, refetch } = useGetProductsQuery({params: { page, limit, sort, name, categoryId }})
  const fetchCategories = useFetchCategoriesQuery({});

  useEffect(() => {
    if (!isLoading) {
      setProducts(data.data.data)
      setPagination(data.data.pagination)
    }
  }, [data, dispatch]);

  useEffect(() => {
    refetch()
  }, [page, limit, sort, name, categoryId])

  useEffect(() => {
    if (!fetchCategories.isLoading) {
      setCategories(fetchCategories.data.data)
    }
  }, [fetchCategories.data, dispatch]);

  const sorts = [
    { id: 1, name: 'Low to high price', value: 'price,asc' },
    { id: 2, name: 'High to low price', value: 'price,desc' },
    { id: 3, name: 'Name A-Z', value: 'name,asc' },
    { id: 4, name: 'Name Z-A', value: 'name,desc' },
  ]

  const handlePageClick = (e:number) => {
    setPage(e)
  }

  const handleSort = (e:any) => {
    const sortId = e.target.value
    const value = sorts[sortId-1].value

    setSort(value)
  }

  const resetFilter = () => {
    setPage(1)
    setSort("")
    setName("")
    setCategoryId(0)
  }

  return (
    <div className="bg-gray-100">
      <Header
        name='Rizqon Maulana'
      />

      {/* Main Content */}
      <main className="container mx-auto px-8 py-6 sm:px-8 md:px-10 lg:px-12">
        {/* Search Results */}
        <div className="flex justify-between mb-4">
          <div className='w-4/12 md:w-7/12 md:mr-5'>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='Search products...'
            />
          </div>
          <div className='w-3/12 md:w-2/12 md:mr-5'>
            <Option 
              datas={categories}
              onChange={(e)=> setCategoryId(e.target.value)}
              text='Filter by category'
            />
          </div>
          <div className='w-3/12 md:w-2/12 md:mr-5'>
            <Option 
              datas={sorts}
              onChange={handleSort}
              text='Sort'
            />
          </div>
          <div className='w-2/12 md:w-1/12'>
            <Button
              text='Reset'
              onClick={resetFilter}
            />
          </div>
        </div>
        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products && products.map((product) => (
            <Card 
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.price}
              stock={product.stock}
              onClick={()=> navigate(`/product/detail/${product.id}`)}
            />
          ))}
        </div>
      </main>

      <div className="flex justify-center h-full my-10">
        <Pagination currentPage={page} totalItems={pagination?.totalData ? pagination?.totalData : 0} itemsPerPage={limit} handlePageClick={(e: any) => handlePageClick(e)} />
      </div>

      <Footer/>
    </div>
  );
};

export default Home;
