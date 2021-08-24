import React from 'react'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaPinterest,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
} from 'react-icons/fa'
import logo from '../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import ChatBox from './ChatBox'
import styled from 'styled-components'
import { signout } from '../actions/userActions'

const Footer = () => {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const dispatch = useDispatch()
  const signoutHandler = () => {
    dispatch(signout())
  }
  return (
    <Wrapper className='footer-section'>
      {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo} />}
      <footer className='footer-top'>
        <div className='section-center'>
          <div className='footer-col'>
            <h3>NEWSLETTER</h3>
            <p>We Love To Share New Offers And Exclusive Promotions</p>
            <form className='footer-form'>
              <input type='text' placeholder='Enter Your E-mail Address' />
              <button type='submit'>
                <FaPaperPlane />
              </button>
            </form>
          </div>

          <div className='footer-col'>
            <div className='footer_logo'>
              <h3>INTEGRO</h3>
              <Link to='/'>
                <img src={logo} alt='logo' />
              </Link>
            </div>

            <p>
              Our purpose Is To Sustainably Make Your Swag Stand Out from The
              Crowd
            </p>
          </div>
          <div className='footer-col'>
            <h3>CONTACT INFO</h3>
            <p>Address: Main Street, Nakuru - Kenya.</p>
            <p>
              Phone: <a href='tel:'>+254758231661</a>
            </p>
            <p>
              Whatsapp: <a href='tel:'>+254758231661</a>
            </p>
            <p>
              Email: <a href='tel:'>mosesjuma@gmail.com</a>
            </p>
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
                  <Link to='/signout'>Admin</Link>
                </li>
              )}
              {userInfo && userInfo.isSeller && (
                <>
                  <li>
                    <Link to='/signout'>Seller</Link>
                  </li>
                  <li>
                    <Link to='/signout'>Account</Link>
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
                  <Link to='/login'>Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </footer>

      <hr />
      <footer className='footer-bottom'>
        <div className='section-center'>
          <div>
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
          </div>
          <div>
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
        </div>
      </footer>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
  width: 100%;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;

  .footer-top,
  .footer-bottom {
    background: var(--clr-blue);
    width: 100%;
    line-height: 1.2em;
    letter-spacing: var(--spacing);
  }

  .section-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 1em;
    padding: 2em 0;
    margin: 0 auto;
    max-width: var(--max-width);
  }

  p {
    color: var(--clr-light-yellow);
    text-decoration: capitalize;
  }

  footer h3 {
    color: var(--clr-light-yellow);
    margin: 1em 0;
    font-size: 1rem;
  }

  br {
    display: none;
  }

  li {
    margin: 0.2em 0;
    color: var(--clr-light-yellow);
  }

  p,
  a {
    color: var(--clr-light-yellow);
    font-size: 0.75rem;
  }

  img {
    width: 100px;
    margin: 0 auto;
  }
  .footer-col {
    width: 100%;
    text-align: center;
  }

  input[type='text'] {
    width: 100%;
    height: 3em;
    margin-top: 1.2em;
    padding: 0 0.5em;
    background: var(--clr-blue);
    color: var(--clr-light-yellow);
    font-size: 0.8rem;
    border: 2px solid var(--clr-yellow);
    outline: 0;
  }

  .footer-form {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .footer-form button {
    margin-top: 1em;
    width: 3em;
    height: 3em;
    line-height: 3em;
    text-align: center;
    font-size: 0.8rem;
    color: var(--clr-blue);
    background-color: var(--clr-yellow);
    border: none;
    outline: none;
    margin-top: 1.2em;
  }

  .copyright {
    margin: 0;
    text-align: center;
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
    margin-top: 0.8em;
  }
  .social-icons > li {
    margin: 0 1.2em;
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
    .footer-col {
      height: 240px;
      margin-left: 1.8em;
      margin-top: 0;
    }
    .section-center {
      flex-direction: row;
    }
    input[type='text'] {
      color: var(--clr-light-yellow);
    }

    footer h3 {
      font-size: 0.8rem;
      margin-bottom: 1.8em;
    }

    .footer-top,
    .footer-bottom {
      line-height: 1.6em;
    }

    br {
      display: block;
    }

    .social-icons {
      margin-top: 0;
    }

    .footer-bottom {
      font-size: 1.2rem;
    }

    .developer {
      font-size: 0.8rem;
    }
    p,
    a {
      font-size: 0.8rem;
    }
  }
`
