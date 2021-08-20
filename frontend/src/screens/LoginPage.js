import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import Register from './RegisterPage'
import styled from 'styled-components'
import { signin } from '../actions/userActions'
import LoadingBox from '../components/LoadingBox'
import ErrorMessage from '../components/ErrorMessage'

const LoginPage = () => {
  const [loginForm] = useState(true)
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
    <Wrapper className='signin-page'>
      <div className='account-page'>
        <div className='form-container'>
          <h4 className='form-title'>Login</h4>

          <form onSubmit={submitHandler} className='login-form '>
            <input
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {loading && <LoadingBox />}
            {error && <ErrorMessage />}
            <button type='submit' className='btn '>
              Login
            </button>
            <div>
              <Link to='' className='forgot-password'>
                Forgot password? Reset
              </Link>
            </div>

            <Link to={`/register?redirect=${redirect}`}>
              Dont have an account? Create One
            </Link>
          </form>
          {loginForm ? null : <Register />}
        </div>
      </div>
      {/*
      <div class="displaycontainer centerflex">
  <div class="entry-menu">
    <div class="menu-cell menu-left">
      <div class="form-content">
        <p>Have an account?</p>
        <div id="btnHaveAccount" class="entrybutton">Sign in</div>
        </div>
    </div>
    <div class="menu-cell menu-right">
      <div class="form-content">
        <p>Don't have an account?</p>
        <div id="btnNoAccount" class="entrybutton">Register</div>
      </div>
    </div>
    
    <div class="form-container">
    <div class="form form-signin">
      <div class="form-content">
        <div id="divNameInput" class="input">
          <div class="centerflex">
            <input type="text" id="txtName" placeholder="display name" />
            <label class="fa fa-user"></label>
          </div>
        </div>
        <div class="input">
          <div class="centerflex">
            <input type="text" id="txtEmail" placeholder="email@domain.com" />
            <label class="fa fa-envelope"></label>
          </div>
        </div>
        <div class="input">
          <div class="centerflex">
            <input type="password" id="txtPassword" placeholder="password" />
            <label class="fa fa-lock"></label>
          </div>
        </div>
        <div id="btnSignin" class="button"></div>
        
        <div class="strike"><span>OR</span></div>
        
        <div>sign in using:</div>
        <div class="alternatelogins">
          <div class="loginrow">
            <label class="fa fa-github-square"></label>
            <label class="fa fa-twitter-square"></label>
            <label class="fa fa-google-plus-square"></label>
            <label class="fa fa-facebook-square"></label>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</div>
      
      */}
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

  .form-btn {
    display: inline-block;
  }

  form {
    max-width: 400px;
    padding: 20px;
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
    font-size: 15px;
    margin-bottom: 10px;
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

  a {
    font-size: 15px;
    margin: 14px 0;
    letter-spacing: 2px;
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

  /* new*/
  @import 'https://fonts.googleapis.com/css?family=Lato:100,300,400,700,900';
  html {
    height: 100%;
    width: 100%;
  }

  body {
    background-color: #1e161f;
    color: #fff;
    font-family: Lato, sans-serif;
    margin: 0;
    width: 100%;
    height: 100%;
  }

  input {
    font-family: Lato, sans-serif;
  }
  input:focus,
  input:active {
    outline: none;
  }

  .displaycontainer {
    display: block;
    height: 100%;
    width: 100%;
  }

  .centerflex {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .entry-menu {
    background-color: #3e363f;
    border-radius: 4px;
    display: flex;
    margin: auto;
    overflow: auto;
    padding: 2em;
    width: 700px;
    height: 233.3333333333px;
  }
  .entry-menu .menu-cell {
    display: block;
    text-align: center;
    width: 350px;
    height: 233.3333333333px;
  }
  .entry-menu .menu-left {
    float: left;
  }
  .entry-menu .menu-right {
    float: right;
  }
  .entry-menu .entrybutton {
    background-color: rgba(255, 255, 255, 0);
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14pt;
    padding: 16px;
    width: 80px;
    transition: background-color 0.2s linear;
  }
  .entry-menu .entrybutton:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }

  .form-content {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    width: 350px;
    height: 233.3333333333px;
  }

  .form-container {
    position: absolute;
  }

  .form {
    background-color: #3e363f;
    border: 2px solid #514a50;
    border-radius: 4px;
    box-shadow: 5px 5px 5px #1e161f;
    color: #fff;
    padding: 20px;
    position: absolute;
    top: -60px;
    width: 350px;
    height: 313.3333333333px;
    transition: all 0.5s ease;
  }
  .form .input {
    border-bottom: 2px solid #514a50;
    display: inline-block;
    margin-bottom: 8px;
  }
  .form .input div {
    display: flex;
  }
  .form .input div label:last-child {
    margin-right: 4px;
    order: -1;
  }
  .form .input label {
    opacity: 0.2;
    transition: opacity 0.2s ease;
  }
  .form input[type='text'],
  .form input[type='password'] {
    background-color: #3e363f;
    border: none;
    color: #fff;
    font-size: 12pt;
    padding: 6px;
    width: 250px;
  }
  .form input[type='text']:focus ~ label,
  .form input[type='password']:focus ~ label {
    opacity: 1;
  }
  .form .button {
    background-color: #dd403a;
    border: 1px solid #3e363f;
    border-radius: 4px;
    cursor: pointer;
    display: inline-block;
    margin-top: 12px;
    padding: 8px 16px 8px 16px;
    width: 250px;
    transition: all 0.2s ease;
  }
  .form .button:hover {
    border: 1px solid #fff;
  }

  #divNameInput {
    position: relative;
    left: 0px;
    transition: all 0.5s ease;
  }

  .form-signin {
    left: 0px;
  }
  .form-signin #divNameInput {
    opacity: 0;
    left: 350px;
  }
  .form-signin .button:before {
    content: 'Sign in';
  }

  .form-register {
    left: 310px;
  }
  .form-register #divNameInput {
    opacity: 1;
  }
  .form-register .button:before {
    content: 'Register';
  }

  .alternatelogins {
    border-radius: 4px;
    display: block;
    justify-content: space-between;
    font-size: 32pt;
    margin: auto;
    margin-top: 12px;
    padding: 8px;
    width: 60%;
  }
  .alternatelogins .loginrow {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .alternatelogins label {
    background: transparent;
    border-bottom: 4px solid #3e363f;
    cursor: pointer;
    padding-bottom: 2px;
    transition: all 0.2s ease;
  }
  .alternatelogins .loginline {
    width: 0.9em;
    height: 0.9em;
  }
  .alternatelogins label.fa-github-square:hover {
    border-bottom: 4px solid #000;
  }
  .alternatelogins label.fa-twitter-square:hover {
    border-bottom: 4px solid #62aadc;
  }
  .alternatelogins label.fa-google-plus-square:hover {
    border-bottom: 4px solid #dd4b39;
  }
  .alternatelogins label.fa-facebook-square:hover {
    border-bottom: 4px solid #3b5998;
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

  .strike > span:before,
  .strike > span:after {
    content: '';
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 2px;
    background: #514a50;
  }

  .strike > span:before {
    right: 100%;
    margin-right: 15px;
  }

  .strike > span:after {
    left: 100%;
    margin-left: 15px;
  }
`

export default LoginPage
