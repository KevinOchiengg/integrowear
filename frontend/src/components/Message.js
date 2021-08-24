import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function Message(props) {
  return (
    <Wrapper>
      <div className='section-center'>
        <div className={`alert alert-${props.variant || 'info'}`}>
          <h4> {props.message}</h4>
          <button className='btn'>
            <Link to={props.url}>{props.buttonText}</Link>
          </button>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .alert {
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
  }
  .alert-info {
    color: var(--clr-blue);
  }
  .btn {
    font-size: 1rem;
  }
  @media only screen and (min-width: 800px) {
    .btn {
      font-size: 1.25rem;
    }
  }
`
