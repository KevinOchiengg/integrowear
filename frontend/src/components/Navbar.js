import React, { useState } from 'react'
import logo from '../images/logo.png'
import { FaAlignRight } from 'react-icons/fa'
import { IoIosBasket } from 'react-icons/io'
import { ImSearch } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/userActions'
import styled from 'styled-components'
import { withRouter } from 'react-router'

const Navbar = (props) => {
  const {
    openSidebar,
    openSubmenu,
    closeSubmenu,
    toggleSeachBar,
    isSearchBarOpen,
  } = useGlobalContext()
  const [name, setName] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    props.history.push(`/search/name/${name}`)
  }
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
        <form
          className={`${
            isSearchBarOpen ? 'search-field show ' : 'search-field'
          }`}
          onSubmit={submitHandler}
        >
          <input
            type='search'
            name='q'
            id='q'
            placeholder='Search for products'
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit'>
            <ImSearch onClick={toggleSeachBar} />
          </button>
        </form>

        <div className='right__item'>
          <ImSearch className='search-icon' onClick={toggleSeachBar} />

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
            <Link to={'/signin'}>
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
  height: 8rem;
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
    width: 9rem;
  }

  .search-field.show {
    visibility: visible;
  }

  .search-field {
    display: flex;
    position: absolute;
    top: 8rem;
    margin: 0 auto;
    width: 90%;
    box-shadow: var(--dark-shadow);
    visibility: hidden;
  }

  .search-field svg {
    width: 3rem;
  }

  .link-btn {
    padding: 0.5rem 1.5rem;
    text-align: center;
    height: 100%;
    background: transparent;
    border: none;
    color: var(--clr-light-yellow);
    text-transform: capitalize;
    letter-spacing: var(--spacing);
    cursor: pointer;
  }

  .search-field button {
    outline: none;
    border: none;
    background: var(--clr-yellow);
    border-radius: 0;
    color: var(--clr-blue);
  }
  .search-field input {
    border-radius: 0;
    height: 3em;
    background: var(--clr-white);
    color: var(--clr-blue);
    outline: none;
    border: none;
    padding: 1em;
    letter-spacing: var(--spacing);
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
    top: -1rem;
    right: -1rem;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: var(--clr-yellow);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  p {
    color: var(--clr-blue);
    font-size: 1.5rem;
  }

  .nav-links {
    display: none;
  }
  .search-icon {
    cursor: pointer;
    margin-right: 1rem;
    color: var(--clr-light-yellow);
  }
  .login-btn,
  .logout-btn {
    background: var(--clr-yellow);
    color: var(--clr-blue);
    display: none;
  }
  .cart,
  .search-icon {
    cursor: pointer;
    margin-left: 0.5rem;
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    color: var(--clr-light-yellow);
  }
  .toggle-btn {
    height: 2rem;
    width: 2rem;
    color: var(--clr-light-yellow);
    margin: 0 0.4rem 0 2rem;
  }
  @media screen and (min-width: 768px) {
    .nav-center {
      max-width: var(--max-width);
    }

    .search-field {
      margin-left: 16em;
      width: 40%;
    }
    .toggle-btn {
      display: none;
    }
    .amount-container {
      height: 2.5rem;
      width: 2.5rem;
      top: -1.4rem;
      right: -1.4rem;
    }

    .login-btn,
    .logout-btn {
      margin-left: 3rem;
      display: inline-block;
    }

    p {
      font-size: 1.7rem;
    }
    .nav-links {
      display: flex;
      text-align: center;
      height: 100%;
      justify-content: center;
    }

    .link-btn {
      font-size: 1.6rem;
    }
  }
`

export default withRouter(Navbar)
