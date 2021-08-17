import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Register from './RegisterPage';
import styled from 'styled-components';
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import ErrorMessage from '../components/ErrorMessage';

const LoginPage = () => {
  const [loginForm] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo]);

  useEffect(() => {
    if (userInfo) {
      history.push('/');
    }
    return () => {
      //cleanup
    };
  }, [userInfo]);

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
    </Wrapper>
  );
};

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
`;

export default LoginPage;
