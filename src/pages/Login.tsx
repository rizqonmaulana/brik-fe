import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';

import { RootState } from '../redux/store'
import { useLoginMutation } from "../redux/api/usersApiSlice"
import { setCredentials } from "../redux/features/auth/authSlice";

const Login = () => {
  const { userInfo } = useSelector((state:RootState) => state.auth);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, error, isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 6) {
      toast.error('Username minimum 6 characters')
      return
    }

    if (password.length < 6) {
      toast.error('Password minimum 6 characters')
      return
    }
    
    try {
      const res = await login({username, password})
      dispatch(setCredentials({...res.data}))
    } catch (error:any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  useEffect(() => {
    if(userInfo) navigate('/')
  }, [])

  useEffect(() => {
    if(isLoading) {
      toast.info('Please wait')
    } else if(error) {
      const errorData = error as { data?: { message?: string } }; // Type assertion to narrow down the type
      if (errorData?.data?.message) {
        toast.error(errorData.data.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } else if(data && data.message) {
      toast.success(data.message)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [data, error, isLoading])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <AuthForm
          title="Login to Klontong Store"
          buttonText="Login"
          username={username}
          password={password}
          setUsername={(e) => setUsername(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
