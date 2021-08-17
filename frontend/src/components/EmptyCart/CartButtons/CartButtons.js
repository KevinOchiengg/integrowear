import React, { useState } from 'react'
import { IoIosBasket } from 'react-icons/io'
import { Link } from 'react-router-dom'
import './CartButtons.css'
import { FaAlignRight } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const CartButton = () => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const openSidebar = () => {
    setIsSidebarOpen(true)
  }

  return (
    <Wrapper className='cart-btn-wrapper'>
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
    </Wrapper>
  )
}

export default CartButton

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 5rem;
  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 5rem;
    .cart-btn {
      color: var(--clr-light-yellow);
      font-size: 1.5rem;
      letter-spacing: var(--spacing);
      display: flex;
      align-items: center;
    }
    .cart-container {
      display: flex;
      align-items: center;
      position: relative;
    }

    .nav-toggle {
      margin-left: 25px;
      background: transparent;
      border: transparent;
      color: var(--clr-light-yellow);
      cursor: pointer;
      font-size: 25px;
    }

    .cart-container svg {
      height: 1.6rem;
      margin-left: 5px;
    }

    .cart-value {
      position: absolute;
      top: -10px;
      right: -16px;
      background: #ffcf1a;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      font-size: 0.75rem;
      color: var(--clr-blue);
      padding: 12px;
    }
    .auth-btn {
      background: var(--clr-yellow);
      color: var(--clr-blue);
      padding: 8px 30px;
      margin: 30px 0;
      border-radius: 30px;
      transition: background 0.5s;
      cursor: pointer;
      outline: none;
      border: none;
      display: none;
    }
    .cart-container svg {
      margin-left: 10px;
    }

    @media (min-width: 800px) {
      .auth-btn {
        display: block;
      }
    }
  }
`
