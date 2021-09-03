import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ErrorPage = () => {
  return (
    <Wrapper className='page'>
      <div className='content'>
        <h1>404</h1>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to='/' className='btn'>
          Back Home
        </Link>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  width: 100%;
  height: 94vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 12rem;
  position: relative;
  padding: 0 20px;
  left: 0;
  right: 0;
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
  }

  .content h1 {
    font-size: 12rem;
    color: rgba(39, 55, 85);
  }

  .content h3 {
    color: rgba(39, 55, 85);
    font-size: 2rem;
  }

  .content .btn {
    color: rgba(39, 55, 85);
    font-size: 1.6rem;
  }

  @media only screen and (max-width: 800px) {
    .content h3 {
      font-size: 1rem;
    }
    .content h1 {
      font-size: 5rem;
    }
    .content .btn {
      font-size: 1rem;
    }
    .page {
      top: 5rem;
      height: 95vh;
    }
  }
`
export default ErrorPage
