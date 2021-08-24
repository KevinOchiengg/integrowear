import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export default function EmptyCart() {
  return (
    <Wrapper>
      <h2>Oops! Your Cart is Empty...</h2>
      <Link to='/' className='btn'>
        Fill It
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  border: 2px solid red;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  top: 5rem;
  position: relative;
  padding: 0 20px;
  left: 0;
  right: 0;
  .empty-cart .btn {
    color: rgba(39, 55, 85);
  }

  .empty-cart h2 {
    font-size: 1.2rem;
    color: rgba(39, 55, 85);
  }

  @media only screen and (min-width: 800px) {
    .empty-cart h2 {
      font-size: 3rem;
    }

    .empty-cart .btn {
      font-size: 26px;
    }

    .empty-cart {
      top: 6rem;
    }
    .empty-cart {
      width: 100%;
      height: 94vh;
    }
  }
`
