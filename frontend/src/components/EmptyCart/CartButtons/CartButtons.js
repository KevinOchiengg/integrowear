import React, { useState } from 'react';
import { IoIosBasket } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './CartButtons.css';
import { FaAlignRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const CartButton = () => {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  return (
    <div className='cart-btn-wrapper'>
      {userInfo ? (
        <button type='button' className='btn auth-btn'>
          Logout
        </button>
      ) : (
        <Link to='/signin'>
          <button type='button' className='btn auth-btn'>
            Login
          </button>
        </Link>
      )}
      <div className='btn-container'>
        <Link to='/cart' className='cart-btn'>
          <span className='cart-container'>
            <IoIosBasket className='basket' />
            <span className='cart-value'>0</span>
          </span>
        </Link>
        <button type='button' className='nav-toggle'>
          <FaAlignRight onClick={openSidebar} />
        </button>
      </div>
    </div>
  );
};

export default CartButton;
