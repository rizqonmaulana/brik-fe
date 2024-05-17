// eslint-disable-next-line
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';

import { RootState } from '../../redux/store'
import { Props } from './props';

import Button from '../Button';

import { logout } from "../../redux/features/auth/authSlice";

const Header: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const { userInfo } = useSelector((state:RootState) => state.auth);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logout')
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 cursor-pointer" onClick={()=>navigate('/')}>Klontong Store</h1>
        <div className="flex items-center space-x-4">
          {
            userInfo && userInfo.role === 'ADMIN' && (
              <Button
                text='Add new product'
                onClick={()=>navigate('/product/create')}
                style={'px-5'}
              />
            )
          }
          {/* User Profile */}
          {
            userInfo && userInfo.name ? (
              <div className="relative">
                <img className='w-10 cursor-pointer ml-auto' alt='' onClick={toggleDropdown} src='https://firebasestorage.googleapis.com/v0/b/brik-api-6a5ee.appspot.com/o/files%2Fprofile.png?alt=media&token=98ab67b2-83ce-4a8a-ba81-ce6083def2aa'/>
                <p>{userInfo.name}</p>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li className="px-4 py-2">
                        <Link to="/order">My Cart</Link>
                      </li>
                      <li className="px-4 py-2">
                        <Link to="/order/history">My Order</Link>
                      </li>
                      <li className="px-4 py-2">
                        <button onClick={handleLogout}>Logout</button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Button
                  text='Login'
                  onClick={()=>navigate('/login')}
                  style='px-5 text-green-700'
                />
                <Button
                  text='Register'
                  onClick={()=>navigate('/register')}
                  style='px-5'
                />
              </>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;
