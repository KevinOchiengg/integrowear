import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ErrorPage = () => {
  return (
    <Wrapper>
      <div className='section-center content'>
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
  height: 70vh;
  margin: 12rem 0;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px;
    height: 100%;
    width: 100%;
  }

  .content h1 {
    font-size: 5rem;
    color: var(--clr-blue);
  }

  .content h3 {
    color: var(--clr-blue);
    font-size: 1.7rem;
    text-align: center;
  }

  .content .btn {
    font-size: 2rem;
  }

  @media only screen and (min-width: 800px) {
    .content h3 {
      font-size: 3rem;
    }
    .content h1 {
      font-size: 10rem;
    }
    .content .btn {
      font-size: 2.2rem;
    }
  }
`
export default ErrorPage
