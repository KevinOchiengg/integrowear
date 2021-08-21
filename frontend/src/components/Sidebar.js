import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { TiShoppingCart } from 'react-icons/ti'
import { MdDashboard } from 'react-icons/md'
import { BiSupport } from 'react-icons/bi'
import { useGlobalContext } from '../context'
import { Link } from 'react-router-dom'
import LoadingBox from './Loading'
import MessageBox from './Message'
import { FaBook } from 'react-icons/fa'
import { listProductCategories } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'
import { signout } from '../actions/userActions'
import styled from 'styled-components'

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
    <Wrapper
      className={`${
        isSidebarOpen ? 'sidebar-wrapper show' : 'sidebar-wrapper'
      }`}
    >
      <div className='sidebar'>
        <nav className='sidebar-header'>
          <h2>
            Integro<span>.</span>
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
              <Link to='/login' onClick={closeSidebar}>
                <h4>Login</h4>
              </Link>
            </section>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  visibility: hidden;
  z-index: -1;
  transition: var(--transition);
  transform: scale(0);
  background: var(--clr-dark-grey);

  .sidebar {
    width: 95%;
    height: 95%;
    background: var(--clr-white);
    border-radius: var(--radius);
    box-shadow: var(--dark-shadow);
    position: relative;
    padding: 2.5em 2rem;
  }
  .sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .sidebar-header h2 {
    font-size: 1.8rem;
    color: var(--clr-dark-grey);
  }
  .sidebar-header span {
    color: var(--clr-yellow);
  }
  .close-btn {
    font-size: 1.8rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-dark-grey);
    cursor: pointer;
  }

  .sidebar-links {
    margin-top: 80px;
  }
  .sidebar-sublinks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 0.25rem;
  }
  .sidebar-conatainer {
    margin: 1rem 0;
  }
  .sidebar-conatainer h4 {
    font-size: 1rem;
    color: var(--clr-dark-grey);
  }
  .sidebar-sublinks a {
    display: block;
    color: var(--clr-dark-grey);
    text-transform: capitalize;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  .sidebar-sublinks svg {
    color: var(--clr-dark-grey);
    margin-right: 1em;
  }

  @media screen and (min-width: 800px) {
    .sidebar-wrapper {
      display: none;
    }
  }
`
