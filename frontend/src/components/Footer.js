import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
} from 'react-icons/fa'

import { useDispatch, useSelector } from 'react-redux'
import Chat from './Chat'
import styled from 'styled-components'
import { signout } from '../actions/userActions'
import logo from '../logo.png'

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <>
      {userInfo && !userInfo.isAdmin && <Chat userInfo={userInfo} />}
      <Wrapper className='footer-section'>
        <footer className='footer-top'>
          <div className='section-center'>
            <div className='footer-col'>
              <div className='footer_logo'>
                <h3>INTEGRO</h3>
                <Link to='/'>
                  <img src={logo} alt='Integrowear' />
                </Link>
              </div>

              <p>
                Our purpose Is To Sustainably Make Your Swag Stand Out from The
                Crowd
              </p>
            </div>
            <div className='footer-col'>
              <h3>NEWSLETTER</h3>
              <p>We Love To Share New Offers And Exclusive Promotions</p>
              <form className='footer-form'>
                <input type='text' placeholder='Enter Your E-mail' />
                <button type='submit'>
                  <FaPaperPlane />
                </button>
              </form>
            </div>

            <div className='footer-col'>
              <h3>CATEGORY</h3>
              <ul>
                <li>
                  <Link to='/'>Men</Link>
                </li>
                <li>
                  <Link to='/'>Women</Link>
                </li>
                <li>
                  <Link to='/'>best seller</Link>
                </li>
                <li>
                  <Link to='/'>new arrivals</Link>
                </li>
              </ul>
            </div>
            <div className='footer-col'>
              <h3>QUICK LINKS</h3>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/'>Career</Link>
                </li>
                <li>
                  <Link to='/products'>Products</Link>
                </li>
                {userInfo && userInfo.isAdmin && (
                  <li>
                    <Link to='/dashboard'>Admin</Link>
                  </li>
                )}
                {userInfo && userInfo.isSeller && (
                  <>
                    <li>
                      <Link to='/userlist'>users</Link>
                    </li>
                    <li>
                      <Link to='/profile'>Account</Link>
                    </li>
                  </>
                )}
                {userInfo ? (
                  <li>
                    <Link to='/signout' onClick={signoutHandler}>
                      Logout
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link to='/signin'>Login</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </footer>

        <footer className='footer-bottom'>
          <div className='footer-bottom-container section-center'>
            <p className='copyright'>
              Copyright &copy; {new Date().getFullYear()} - Powered by
              <Link
                className='developer'
                to={{
                  pathname: 'https://ko-technologies.netlify.com',
                }}
                target='_blank'
              >
                K&O Technologies
              </Link>
            </p>

            <ul className='social-icons'>
              <li>
                <Link
                  to={{
                    pathname:
                      'https://www.facebook.com/Swag-Mode-100392718038597',
                  }}
                  target='_blank'
                >
                  <FaFacebook />
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname:
                      'https://www.facebook.com/Swag-Mode-100392718038597',
                  }}
                  target='_blank'
                >
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname:
                      'https://www.facebook.com/Swag-Mode-100392718038597',
                  }}
                  target='_blank'
                >
                  <FaPinterest />
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname:
                      'https://www.facebook.com/Swag-Mode-100392718038597',
                  }}
                  target='_blank'
                >
                  <FaTwitter />
                </Link>
              </li>
            </ul>
          </div>
        </footer>
      </Wrapper>
    </>
  )
}

export default Footer

const Wrapper = styled.footer`
  .footer-top,
  .footer-bottom {
    background: var(--clr-blue);
    width: 100%;
    line-height: 1.2em;
    letter-spacing: var(--spacing);
  }

  .section-center {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 1.5rem;
    padding: 2em 0;
    margin: 0 auto;
    text-align: center;
  }

  p {
    text-decoration: capitalize;
  }

  footer h3 {
    color: var(--clr-light-yellow);
    margin: 1em 0;
    font-size: 2rem;
  }

  li {
    margin: 1.2rem 0;
    color: var(--clr-light-yellow);
  }

  p,
  a {
    color: var(--clr-light-yellow);
    font-size: 1.6rem;
    line-height: 1.5;
  }

  img {
    width: 30%;
    margin: 0 auto;
  }
  .footer-col {
    width: 100%;
    text-align: center;
  }

  input[type='text'] {
    width: 60%;
    height: 4rem;
    padding: 0 0.5em;
    background: var(--clr-blue);
    color: var(--clr-light-yellow);
    font-size: 1.2rem;
    border: 2px solid var(--clr-yellow);
    outline: 0;
    border-radius: 0;
  }

  .footer-form {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
  }

  .footer-form button {
    width: 4rem;
    height: 4rem;
    line-height: 4rem;
    font-size: 2rem;
    color: var(--clr-blue);
    background-color: var(--clr-yellow);
    border: none;
    outline: none;
    border-radius: 0;
  }

  .footer-bottom {
    border-top: 1px solid var(--clr-light-blue);
    background: var(--clr-blue);
  }

  .footer-bottom-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .copyright a {
    color: #8aabca;
  }
  .developer {
    margin-left: 0.5em;
  }

  .social-icons {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .social-icons > li {
    margin: 0 1.6rem;
  }

  svg {
    font-size: 2rem;
  }

  a {
    color: var(--clr-light-yellow);
    &:hover,
    &:focus {
      transition: var(--transition);
      color: var(--clr-yellow);
    }
  }

  @media (min-width: 800px) {
    input[type='text'] {
      color: var(--clr-light-yellow);
    }

    footer h3 {
      margin-bottom: 1.8rem;
    }

    .footer-bottom-container {
      justify-content: space-between;
    }

    .footer-top,
    .footer-bottom {
      line-height: 1.6em;
    }

    .social-icons {
      margin-top: 0;
    }

    .footer-bottom {
      font-size: 1.6rem;
    }

    .developer {
      font-size: 1.6rem;
    }
    .social-icons {
      width: auto;
    }
  }
`
