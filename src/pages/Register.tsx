import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthForm from '../components/AuthForm';

import { RootState } from '../redux/store'
import { useRegisterMutation } from "../redux/api/usersApiSlice"

const Register: React.FC = () => {
  const { userInfo } = useSelector((state:RootState) => state.auth);

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [register, { data, error, isLoading }] = useRegisterMutation();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 6) {
      toast.error('Name minimum 6 characters')
      return
    }

    if (username.length < 6) {
      toast.error('Username minimum 6 characters')
      return
    }

    if (password.length < 6) {
      toast.error('Password minimum 6 characters')
      return
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    register({
      name,
      username,
      password
    })
  };

  useEffect(() => {
    if(userInfo) navigate('/')
  }, [userInfo, navigate])

  useEffect(() => {
    if(isLoading) {
      toast.info('Please wait, creating user')
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
        navigate('/login');
      }, 2000);
    }
  }, [data, error, isLoading, navigate])
  

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <AuthForm
          title="Register Klontong Account"
          buttonText="Sign Up"
          username={username}
          name={name}
          password={password}
          confirmPassword={confirmPassword}
          setUsername={(e) => setUsername(e.target.value)}
          setName={(e) => setName(e.target.value)}
          setPassword={(e) => setPassword(e.target.value)}
          setConfirmPassword={(e) => setConfirmPassword(e.target.value)}
          isRegister
          onSubmit={handleRegister}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
