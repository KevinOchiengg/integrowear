import React from 'react'
import logo from '../images/logo.png'
import { FaAlignRight } from 'react-icons/fa'
import { IoIosBasket } from 'react-icons/io'
import { ImSearch } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/userActions'
import styled from 'styled-components'

const Navbar = () => {
  const { openSidebar, openSubmenu, closeSubmenu } = useGlobalContext()
  const displaySubmenu = (e) => {
    const page = e.target.textContent
    const tempBtn = e.target.getBoundingClientRect()
    const center = (tempBtn.left + tempBtn.right) / 2
    const bottom = tempBtn.bottom - 3
    openSubmenu(page, { center, bottom })
  }
  const handleSubmenu = (e) => {
    if (!e.target.classList.contains('link-btn')) {
      closeSubmenu()
    }
  }
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  return (
    <Wrapper className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} className='nav-logo' alt='Integrowears' />
          </Link>
        </div>

        <ul className='nav-links'>
          <li>
            <Link to='/'>
              <button className='link-btn'>HOME</button>
            </Link>
          </li>

          <li>
            <Link to='/products'>
              <button className='link-btn'>PRODUCTS</button>
            </Link>
          </li>

          {userInfo && userInfo.isAdmin && (
            <li>
              <button className='link-btn' onMouseOver={displaySubmenu}>
                ADMIN
              </button>
            </li>
          )}

          {userInfo && userInfo.isSeller && (
            <React.Fragment>
              <li>
                <button className='link-btn' onMouseOver={displaySubmenu}>
                  SELLER
                </button>
              </li>
              <li>
                <button className='link-btn' onMouseOver={displaySubmenu}>
                  ACCOUNT
                </button>
              </li>
            </React.Fragment>
          )}

          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              CATEGORY
            </button>
          </li>
        </ul>

        <div className='right__item'>
          <Link to='/'>
            <ImSearch className='search-icon' />
          </Link>

          <div className='cart-container'>
            <Link to='/cart'>
              <IoIosBasket className='cart' />
            </Link>
            <div className='amount-container'>
              {cartItems.length >= 0 && <p>{cartItems.length}</p>}
            </div>
          </div>
          {userInfo ? (
            <Link to={'/signout'} onClick={signoutHandler}>
              <button className='btn login-btn'>Logout</button>
            </Link>
          ) : (
            <Link to={'/login'}>
              <button className='btn logout-btn'>Login</button>
            </Link>
          )}
          <FaAlignRight className='toggle-btn' onClick={openSidebar} />
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  background: var(--clr-blue);
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  border-bottom: 1px solid var(--clr-yellow);
  .nav-logo {
    width: 3.5em;
  }
  .nav-center {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4em;
  }
  .right__item {
    display: flex;
    align-items: center;
    height: 4em;
    justify-content: center;
  }
  .cart-container {
    display: flex;
    position: relative;
    margin-right: 0.2em;
  }

  .amount-container {
    position: absolute;
    top: -0.6rem;
    right: -0.6rem;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: var(--clr-yellow);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    color: var(--clr-blue);
    font-size: 12px;
  }

  .nav-links {
    display: none;
  }
  .search-icon {
    font-size: 1.2rem;
    margin-right: 1.2em;
    color: var(--clr-light-yellow);
  }
  .login-btn,
  .logout-btn {
    display: none;
  }
  .cart {
    font-size: 1.2rem;
    color: var(--clr-light-yellow);
    cursor: pointer;
  }
  .toggle-btn {
    font-size: 1.2rem;
    color: var(--clr-light-yellow);
    margin: 0 0.4rem 0 1rem;
  }
  @media screen and (min-width: 800px) {
    .nav-center {
      grid-template-columns: auto 1fr auto;
      max-width: var(--max-width);
    }
    .toggle-btn {
      display: none;
    }

    .login-btn,
    .logout-btn {
      margin-left: 1.2em;
      display: inline-block;
    }

    p {
      font-size: 0.6rem;
    }
    .nav-links {
      display: block;
      display: flex;
      text-align: center;
      height: 100%;
      justify-content: center;
    }

    .link-btn {
      font-size: 0.825rem;
      text-align: center;
      height: 100%;
      background: transparent;
      border: none;
      color: var(--clr-light-yellow);
      text-transform: capitalize;
      letter-spacing: var(--spacing);
      margin: 0 0.5em;
      cursor: pointer;
    }
  }
`

export default Navbar
