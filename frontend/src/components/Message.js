import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Message(props) {
  return (
    <Wrapper className='message-container'>
      <h3 className={`alert alert-${props.variant || 'info'}`}>
        {props.message}
      </h3>
      <Link to={`${props.url}`} className={`btn btn-${props.name}`}>
        {props.buttonText}
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;

  a {
    color: var(--clr-blue);
  }

  .btn {
    margin: 0 auto;
  }

  .btn-hide {
    display: none;
  }

  .alert-danger {
    color: var(--clr-red);
  }
  .alert-success {
    color: var(--green);
  }
  .danger {
    color: var(--clr-red);
  }

  h3 {
    margin: 2rem 0;
    font-size: 1.7rem;
    color: var(--clr-blue);
  }
  @media only screen and (min-width: 800px) {
    h2 {
      font-size: 2rem;
    }
  }
`
