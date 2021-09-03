import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Message(props) {
  return (
    <Wrapper>
      <div className='message-container'>
        <div className={`alert alert-${props.variant || 'info'}`}>
          <h2> {props.message}</h2>
          <Link to={`${props.url}`}>
            <button className={`btn btn-${props.name}`}>
              {props.buttonText}
            </button>
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .alert {
    text-align: center;
  }
  a {
    color: var(--clr-blue);
  }
  .btn {
    background: var(--clr-yellow);
    font-size: 1.25rem;
    color: var(--clr-blue);
    margin-top: 0;
  }

  .message-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 13rem auto;
    height: 60vh;
  }

  h2 {
    font-size: 2.2rem;
    color: var(--clr-blue);
  }
  @media only screen and (min-width: 800px) {
    .btn {
      font-size: 2rem;
    }

    h2 {
      font-size: 4rem;
    }
  }
`
