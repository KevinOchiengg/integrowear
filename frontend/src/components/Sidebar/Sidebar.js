import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { TiShoppingCart } from 'react-icons/ti'
import { MdDashboard } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { useGlobalContext } from '../../context'
import { Link } from 'react-router-dom'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { FaBook } from 'react-icons/fa'
import './Sidebar.css'
import { listProductCategories } from '../../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../../actions/userActions'

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext()
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
    <aside
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <div className='sidebar'>
        <nav className='sidebar-nav'>
          <h2>
            Integrowears<span>.</span>
          </h2>
          <button className='close-btn' onClick={closeSidebar}>
            <FaTimes />
          </button>
        </nav>

        <div className='sidebar-links'>
          <section className='sidebar-conatainer'>
            <Link to='/' onClick={closeSidebar}>
              <h4>Home</h4>
            </Link>
          </section>
          <section className='sidebar-conatainer'>
            <Link to='/contact' onClick={closeSidebar}>
              <h4>Contacts</h4>
            </Link>
          </section>
          <section className='sidebar-conatainer'>
            <Link to='/products' onClick={closeSidebar}>
              <h4>Products</h4>
            </Link>
          </section>

          {userInfo && userInfo.isSeller && (
            <section className='sidebar-conatainer'>
              <h4>Sellers</h4>
              <div className='sidebar-sublinks'>
                <Link to='/productlist/seller' onClick={closeSidebar}>
                  {<FaBook />}
                  {'Products'}
                </Link>
                <Link to='/orderlist/seller' onClick={closeSidebar}>
                  {<FaBook />}
                  {'Orders'}
                </Link>
              </div>
            </section>
          )}

          <section className='sidebar-conatainer'>
            <h4>Categories</h4>
            <div className='sidebar-sublinks'>
              {loadingCategories ? (
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant='danger'>{errorCategories}</MessageBox>
              ) : (
                categories.map((c) => (
                  <Link
                    key={c}
                    to={`/search/category/${c}`}
                    onClick={closeSidebar}
                  >
                    {<TiShoppingCart />} {c}
                  </Link>
                ))
              )}
            </div>
          </section>
          {userInfo && userInfo.isAdmin && (
            <section className='sidebar-conatainer'>
              <h4>Admin</h4>
              <div className='sidebar-sublinks'>
                <Link to='/dashboard' onClick={closeSidebar}>
                  {<MdDashboard />}
                  {'Dashboard'}
                </Link>
                <Link to='/productlist' onClick={closeSidebar}>
                  {<FaBook />}
                  {'Products'}
                </Link>
                <Link to='/orderlist' onClick={closeSidebar}>
                  {<FaBook />}
                  {'Orders'}
                </Link>
                <Link to='/userlist' onClick={closeSidebar}>
                  {<CgProfile />}
                  {'Users'}
                </Link>
                <Link to='/support' onClick={closeSidebar}>
                  {<BiSupport />}
                  {'Support'}
                </Link>
              </div>
            </section>
          )}

          {userInfo ? (
            <section className='sidebar-conatainer'>
              <Link to='#signout' onClick={signoutHandler}>
                <h4>Sign Out</h4>
              </Link>

              <div className='sidebar-sublinks'>
                <Link to='/profile' onClick={closeSidebar}>
                  {<CgProfile />}
                  {'User Profile'}
                </Link>
                <Link to='/orderhistory' onClick={closeSidebar}>
                  {<FaBook />}
                  {'Order History'}
                </Link>
              </div>
            </section>
          ) : (
            <section className='sidebar-conatainer'>
              <Link to='/signin' onClick={closeSidebar}>
                <h4>Sign In</h4>
              </Link>
            </section>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
