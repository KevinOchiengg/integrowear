import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Message(props) {
  return (
    <Wrapper>
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
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .alert {
    text-align: center;
  }
  a {
    color: var(--clr-blue);
  }

  .btn {
    margin: 0 auto;
  }

  h3 {
    margin: 6rem 0;
    font-size: 2.2rem;
    color: var(--clr-blue);
  }
  @media only screen and (min-width: 800px) {
    h2 {
      font-size: 2rem;
    }
  }
`
