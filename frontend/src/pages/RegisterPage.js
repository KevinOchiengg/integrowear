import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { register } from '../serviceWorker'
import ErrorMessage from '../components/ErrorMessage'
import LoadingBox from '../components/Loading'
import styled from 'styled-components'

const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const location = useLocation()
  const userRegister = useSelector((state) => state.userRegister)
  const { loading, userInfo, error } = userRegister
  const history = useHistory()
  const dispatch = useDispatch()

  const redirect = location.search ? location.search.split('=')[1] : '/'

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
    <Wrapper className='signin-page'>
      <div className='account-page'>
        <div className='form-container'>
          <h3 className='form-title'>Register</h3>
          <form onSubmit={submitHandler} className='reg-form '>
            <input
              type='text'
              placeholder='Name'
              required
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type='email'
              placeholder='Email'
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type='password'
              placeholder='Confirm Password'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {loading && <LoadingBox />}
            {error && <ErrorMessage />}
            <button type='submit' className='btn'>
              Register
            </button>
            <Link to={`/login`}>Have an account? Login</Link>
          </form>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 6rem;

  .account-page {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 94vh;
  }

  .form-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--clr-light-yellow);
    width: 500px;
    height: auto;
    padding: 40px 0;
    margin: 0 20px;
    box-shadow: var(--dark-shadow);
  }

  .form-title {
    font-size: 2rem;
    color: var(--clr-dark-grey);
  }

  .form-btn {
    display: inline-block;
  }

  form {
    max-width: 400px;
    padding: 20px 20px;
    transition: var(--transition);
  }

  input {
    width: 100%;
    height: 30px;
    margin: 10px 0;
    padding: 0 10px;
    background: none;
    border: 1px solid var(--clr-light-grey);
    letter-spacing: 2px;
    &:focus {
      outline: none;
    }
  }

  .btn {
    width: 100%;
    border: none;
    cursor: pointer;
    margin: 10px 0;
    outline: none;
    font-size: 1.2rem;
    letter-spacing: 2px;
    color: var(--clr-blue);
    &:focus {
      outline: none;
    }
  }

  .forgot-password {
    font-size: 14px;
    color: #8aabca;
  }
  .create-account {
    margin: 10px 0;
    cursor: pointer;
    background: 0;
    border: none;
    font-size: 14px;
    color: #8aabca;
  }
  .form-title {
    font-size: 2rem;
    color: var(--clr-dark-grey);
  }

  @media only screen and (min-width: 800px) {
    .form-title {
      font-size: 2.5rem;
    }
    .form-container {
      margin: auto;
    }
    input {
      height: 40px;
      font-size: 16px;
    }
  }
`

export default RegisterPage
