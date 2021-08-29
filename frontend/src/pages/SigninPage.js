import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { signin } from '../actions/userActions'
import Loading from '../components/Loading'
import ErrorMessage from '../components/ErrorMessage'
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaRegUserCircle,
} from 'react-icons/fa'

const SigninPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState('')
  const userSignin = useSelector((state) => state.userSignin)
  const { loading, userInfo, error } = userSignin
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(signin(email, password))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  useEffect(() => {
    if (userInfo) {
      history.push('/')
    }
    return () => {
      //cleanup
    }
  }, [userInfo])

  return (
    <Wrapper>
      <div className='section-center'>
        <div className='form'>
          <div className='header'>
            <FaRegUserCircle />
            <h4>Login</h4>
          </div>
          <form onSubmit={submitHandler} className='form-content'>
            <div className='field-container'>
              <FaEnvelope />

              <input
                type='email'
                id='email'
                placeholder='Enter email'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='field-container'>
              <FaLock />
              <input
                type='password'
                id='password'
                placeholder='Enter password'
                required
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className='forgot-password'>
              <Link to='/'>
                <p>Forgot password</p>
              </Link>
            </div>
            {loading && <Loading />}
            {error && <ErrorMessage />}
            <button type='submit' className='btn'>
              Sign In
            </button>
          </form>
          <div className='strike'>
            <span>OR</span>
          </div>

          <div className='sign-in-using'>
            <h6>sign in using:</h6>
          </div>
          <div className='alternate-logins-cotainer'>
            <Link to='/'>
              <FaFacebook className='facebook' />
            </Link>

            <Link to='/' className='twitter'>
              <FaTwitter />
            </Link>
            <Link to='/'>
              <FaGoogle className='google' />
            </Link>
          </div>

          <div className='register-text-container'>
            <p>Don't have an account?</p>
            <Link to={`/register?redirect=${redirect}`}>
              <h6>Register</h6>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 6rem 0;
  color: var(--clr-light-yellow);
  .btn {
    width: 50%;
    border: none;
    margin: 0.8em auto;
    outline: none;
    font-size: 1rem;
    letter-spacing: 2px;
    color: var(--clr-blue);
  }

  .form-content {
    text-align: center;
    margin: 3em auto 0 auto;
  }

  .form {
    background: var(--clr-blue);
    border-radius: 4px;
    box-shadow: var(--dark-shadow);
    padding: 0.5em;
    width: 100%;
    height: auto;
    transition: var(--transition);
    margin: 2em auto;
  }
  .field-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2px solid var(--clr-dark-grey);
    width: 70%;
    margin: 1em auto;
  }

  svg {
    margin-right: 10px;
  }

  input[type='email'],
  input[type='password'] {
    background: var(--clr-blue);
    border-radius: none;
    border: none;
    color: var(--clr-white);
    font-size: 1rem;
    padding: 6px;
    width: 100%;
  }

  .alternate-logins-cotainer {
    display: flex;
    margin-top: 1em;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .alternate-logins-cotainer svg {
    font-size: 1.25rem;
    color: var(--clr-light-yellow);
    margin: 0 0.4em;
  }
  .forgot-password {
    margin-top: 2em;
  }

  .forgot-password a {
    color: var(--clr-light-yellow);
  }
  .twitter:hover {
    border-bottom: 3px solid #62aadc;
  }
  .google:hover {
    border-bottom: 3px solid #dd4b39;
  }
  .facebook:hover {
    border-bottom: 3px solid #3b5998;
  }

  .strike {
    display: block;
    margin-top: 12px;
    margin-bottom: 12px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
  }

  .strike > span {
    position: relative;
    display: inline-block;
  }

  .header h4 {
    margin-top: 1em;
  }

  .header svg {
    font-size: 2rem;
  }

  .header svg,
  h4 {
    margin: 0 auto;
  }

  .strike > span:before,
  .strike > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 525%;
    height: 2px;
    background: var(--clr-dark-grey);
  }

  .strike > span:before {
    right: 100%;
    margin-right: 15px;
  }

  .strike > span:after {
    left: 100%;
    margin-left: 15px;
  }

  .sign-in-using h6 {
    margin: 0 auto;
    font-size: 1rem;
  }
  .register-text-container {
    text-align: center;
  }
  .register-text-container h6 {
    font-size: 1rem;
    text-decoration: underline;
    color: var(--clr-light-yellow);
  }
  @media only screen and (min-width: 800px) {
    .form {
      width: 40%;
    }
  }
`

export default SigninPage
