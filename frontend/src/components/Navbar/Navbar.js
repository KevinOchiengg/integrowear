import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaAlignRight } from 'react-icons/fa'
import { IoIosBasket } from 'react-icons/io'
import logo from '../../images/logo.png'
import { Link, Route } from 'react-router-dom'
import './Navbar.css'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import SearchBox from '../../components/SearchBox/SearchBox'
import { signout } from '../../actions/userActions'
import { listProductCategories } from '../../actions/productActions'

const Navbar = () => {
  const cart = useSelector((state) => state.cart)
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)
  const { cartItems } = cart
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList
  useEffect(() => {
    dispatch(listProductCategories())
  }, [dispatch])
  return (
    <>
      <header className='row'>
        <div>
          <button
            type='button'
            className='open-sidebar'
            onClick={() => setSidebarIsOpen(true)}
          >
            <FaAlignRight />
          </button>
          <Link className='brand' to='/'>
            amazona
          </Link>
        </div>
        <div>
          <Route
            render={({ history }) => <SearchBox history={history} />}
          ></Route>
        </div>
        <div>
          <Link to='/cart'>
            Cart
            {cartItems.length > 0 && (
              <span className='badge'>{cartItems.length}</span>
            )}
          </Link>
          {userInfo ? (
            <div className='dropdown'>
              <Link to='#'>
                {userInfo.name} <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/profile'>User Profile</Link>
                </li>
                <li>
                  <Link to='/orderhistory'>Order History</Link>
                </li>
                <li>
                  <Link to='#signout' onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to='/signin'>Sign In</Link>
          )}
          {userInfo && userInfo.isSeller && (
            <div className='dropdown'>
              <Link to='#admin'>
                Seller <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/productlist/seller'>Products</Link>
                </li>
                <li>
                  <Link to='/orderlist/seller'>Orders</Link>
                </li>
              </ul>
            </div>
          )}
          {userInfo && userInfo.isAdmin && (
            <div className='dropdown'>
              <Link to='#admin'>
                Admin <i className='fa fa-caret-down'></i>
              </Link>
              <ul className='dropdown-content'>
                <li>
                  <Link to='/dashboard'>Dashboard</Link>
                </li>
                <li>
                  <Link to='/productlist'>Products</Link>
                </li>
                <li>
                  <Link to='/orderlist'>Orders</Link>
                </li>
                <li>
                  <Link to='/userlist'>Users</Link>
                </li>
                <li>
                  <Link to='/support'>Support</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>
      <aside className={sidebarIsOpen ? 'open' : ''}>
        <ul className='categories'>
          <li>
            <strong>Categories</strong>
            <button
              onClick={() => setSidebarIsOpen(false)}
              className='close-sidebar'
              type='button'
            >
              <i className='fa fa-close'></i>
            </button>
          </li>
          {loadingCategories ? (
            <LoadingBox></LoadingBox>
          ) : errorCategories ? (
            <MessageBox variant='danger'>{errorCategories}</MessageBox>
          ) : (
            categories.map((c) => (
              <li key={c}>
                <Link
                  to={`/search/category/${c}`}
                  onClick={() => setSidebarIsOpen(false)}
                >
                  {c}
                </Link>
              </li>
            ))
          )}
        </ul>
      </aside>
    </>
  )
}

export default Navbar
