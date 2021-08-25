import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Message(props) {
  return (
    <Wrapper>
      <div className='section-center'>
        <div className={`alert alert-${props.variant || 'info'}`}>
          <h4> {props.message}</h4>
          <button className={`btn btn-${props.name}`}>
            <Link to={`${props.url}`}>{props.buttonText}</Link>
          </button>
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
    padding: 0.5em 3em;
    font-size: 1rem;
    margin-top: 0;
  }
  @media only screen and (min-width: 800px) {
    .btn {
      font-size: 1.25rem;
    }
  }
`
