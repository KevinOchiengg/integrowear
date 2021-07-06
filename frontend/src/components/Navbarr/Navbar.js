import React from 'react'
import logo from '../../images/logo.png'
import { FaAlignRight } from 'react-icons/fa'
import { IoIosBasket } from 'react-icons/io'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context'

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
  return (
    <nav className='nav' onMouseOver={handleSubmenu}>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={logo} className='nav-logo' alt='' />
          </Link>
        </div>
        <ul className='nav-links'>
          <li>
            <Link to='/'>
              <button className='link-btn'>Home</button>
            </Link>
          </li>
          <li>
            <Link to='/contact'>
              <button className='link-btn'>Contact</button>
            </Link>
          </li>
          <li>
            <Link to='/products'>
              <button className='link-btn'>products</button>
            </Link>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              products
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              developers
            </button>
          </li>
          <li>
            <button className='link-btn' onMouseOver={displaySubmenu}>
              company
            </button>
          </li>
        </ul>

        <div className='right__item'>
          <Link to={'/signin'}>
            <button className='btn signin-btn'>Log in</button>
          </Link>

          <div className='nav-container'>
            <IoIosBasket className='cart' />
            <div className='amount-container'>
              <p>0</p>
            </div>
          </div>
          <FaAlignRight className='toggle-btn' onClick={openSidebar} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
