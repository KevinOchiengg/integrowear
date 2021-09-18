import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { signin } from '../actions/userActions'
import Loading from '../components/Loading'

import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaRegUserCircle,
} from 'react-icons/fa'
import Message from '../components/Message'

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
  }, [history, userInfo])

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
              <Link to='/'>Forgot password?</Link>
            </div>
            {loading && <Loading />}
            {error && (
              <Message
                variant='danger'
                message='Invalid email or password '
                name='hide'
              />
            )}
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
              <FaFacebook />
            </Link>

            <Link to='/'>
              <FaTwitter />
            </Link>
            <Link to='/'>
              <FaGoogle />
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
export default SigninPage

const Wrapper = styled.section`
  margin: 12rem 0;
  color: var(--clr-light-grey);
  .btn {
    width: 50%;
  }

  .form-content {
    text-align: center;
    margin: 3rem auto 0 auto;
  }
  .btn-hide {
    display: none;
  }
  .form {
    border-radius: 4px;
    box-shadow: var(--dark-shadow);
    padding: 0.5rem;
    width: 100%;
    height: auto;
    transition: var(--transition);
    margin: 2rem auto;
  }
  .field-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid var(--clr-light-grey);
    width: 90%;
    margin: 2rem auto;
    font-size: 2rem;
  }

  svg {
    margin-right: 10px;
  }

  input[type='email'],
  input[type='password'],
  input[type='text'] {
    border-radius: none;
    border: none;
    color: var(--clr-blue);
    font-size: 2rem;
    padding: 6px;
    width: 100%;
  }

  .alternate-logins-cotainer {
    display: flex;
    margin-top: 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .alternate-logins-cotainer svg {
    font-size: 2rem;
    color: var(--clr-blue);
    margin: 0 1rem;
  }
  .forgot-password {
    font-size: 1.7rem;
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
    font-size: 1.6rem;
  }

  .header h4 {
    margin-top: 1rem;
    color: var(--clr-blue);
  }

  .header {
    font-size: 2.8rem;
  }

  .header svg,
  h4 {
    margin: 0 auto;
  }

  .header svg {
    font-size: 4rem;
  }
  .strike > span:before,
  .strike > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 525%;
    height: 1px;
    background: var(--clr-light-grey);
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
    font-size: 2rem;
  }
  .register-text-container {
    text-align: center;
  }
  .register-text-container p {
    font-size: 2rem;
  }
  .register-text-container h6 {
    font-size: 2rem;
    text-decoration: underline;
    color: var(--clr-blue);
  }
  @media only screen and (min-width: 800px) {
    .form {
      width: 40%;
    }

    .field-container {
      width: 80%;
    }
  }
`
