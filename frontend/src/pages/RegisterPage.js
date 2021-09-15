import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  FaFacebook,
  FaTwitter,
  FaGoogle,
  FaLock,
  FaEnvelope,
  FaRegUserCircle,
  FaUser,
} from 'react-icons/fa'
import { register } from '../actions/userActions'

import Loading from '../components/Loading'
import styled from 'styled-components'
import Message from '../components/Message'

const RegisterPage = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userRegister = useSelector((state) => state.userRegister)
  const { userInfo, loading, error } = userRegister

  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert('Password and confirm password are not match')
    } else {
      dispatch(register(name, email, password))
    }
  }
  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, redirect, userInfo])

  return (
    <Wrapper>
      <div className='section-center'>
        <div className='form'>
          <div className='header'>
            <FaRegUserCircle />
            <h4>Register</h4>
          </div>
          {loading && <Loading />}
          {error && <Message variant='danger' message='error' />}
          <form onSubmit={submitHandler} className='form-content'>
            <div className='field-container'>
              <label htmlFor='name'>
                <FaUser />
              </label>
              <input
                id='name'
                type='text'
                placeholder='Name'
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='field-container'>
              <label htmlFor='email'>
                <FaEnvelope />
              </label>
              <input
                type='email'
                id='email'
                placeholder='email@domain.com'
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className='field-container'>
              <label htmlFor='password'>
                <FaLock />
              </label>
              <input
                type='password'
                id='password'
                placeholder='password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='field-container'>
              <label htmlFor='confirmPassword'>
                <FaLock />
              </label>
              <input
                type='password'
                id='confirmPassword'
                placeholder='Confirm Password'
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type='submit' className='btn'>
              Register
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
            <p>Have an account?</p>
            <Link to={`/signin?redirect=${redirect}`}>
              <h6>Login</h6>
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

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
    margin-top: 2rem;
  }

  .forgot-password a {
    color: var(--clr-blue);
    font-size: 2rem;
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

export default RegisterPage
