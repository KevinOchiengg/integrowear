import React from 'react'
import logo from '../../images/logo.png'
import { FaAlignRight } from 'react-icons/fa'
import { IoIosBasket } from 'react-icons/io'
import { ImSearch } from 'react-icons/im'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions/userActions'

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
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <Link to='/'>
          <img src={logo} className='nav-logo' alt='' />
        </Link>

        <ul className='nav-links'>
          <li>
            <Link to='/'>
              <button className='link-btn'>Home</button>
            </Link>
          </li>

          <li>
            <Link to='/products'>
              <button className='link-btn'>products</button>
            </Link>
          </li>
          {userInfo && userInfo.isAdmin && (
            <li>
              <button className='link-btn' onMouseOver={displaySubmenu}>
                Admin
              </button>
            </li>
          )}

          {userInfo && userInfo.isSeller && (
            <li>
              <button className='link-btn' onMouseOver={displaySubmenu}>
                Seller
              </button>
            </li>
          )}

          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              Category
            </button>
          </li>

          {userInfo && userInfo.isSeller && (
            <li>
              <button className='link-btn' onMouseOver={displaySubmenu}>
                Account
              </button>
            </li>
          )}
        </ul>

        <div className='right__item'>
          <Link to='/'>
            <ImSearch className='search-icon' />
          </Link>

          <div className='nav-container'>
            <Link to='/cart'>
              <IoIosBasket className='cart' />
            </Link>
            <div className='amount-container'>
              {cartItems.length >= 0 && <p>{cartItems.length}</p>}
            </div>
          </div>
          {userInfo ? (
            <Link to={'/signout'} onClick={signoutHandler}>
              <button className='btn signin-btn'>Log out</button>
            </Link>
          ) : (
            <Link to={'/signin'}>
              <button className='btn signin-btn'>Log in</button>
            </Link>
          )}
          <FaAlignRight className='toggle-btn' onClick={openSidebar} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
