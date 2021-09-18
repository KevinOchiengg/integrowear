import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { formatPrice } from '../utils/helpers'

export default function Product({ product }) {
  const [qty] = useState(1)

  return (
    <Wrapper>
      <article className='box'>
        <div className='image'>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <div className='heart-container'>
            <Link to={`/wishlist/${product._id}`} className='heart'>
              <AiOutlineHeart />
            </Link>
          </div>
        </div>
        <div className='content'>
          <div className='stars'>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <Link to={`/product/${product._id}`}>
            <h3>{product.name.substring(0, 20)}</h3>
          </Link>

          <p>{product.description.substring(0, 50)}...</p>

          <Link className='btn' to={`/cart/${product._id}?qty=${qty}`}>
            add to cart
          </Link>

          <span className='price'>{formatPrice(product.price)}</span>
        </div>
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 0 auto;

  .box {
    background: var(--clr-white);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    box-shadow: var(--light-shadow);
    margin: 0 auto;
  }

  .box .image {
    height: 30rem;
    width: 100%;
    padding: 1.5rem;
    overflow: hidden;
    position: relative;
  }

  .heart-container svg {
    color: var(--clr-blue);
  }

  .box .image img {
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }
  .heart-container a {
    border-radius: 50%;
    line-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .heart-container {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    height: 5rem;
    width: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 2rem;
    background: var(--clr-white);
    border-radius: 50%;
    box-shadow: var(--light-shadow);
    transition: var(--transition);
    &:hover {
      background-color: var(--clr-blue);
      svg {
        color: var(--clr-white);
      }
    }
  }

  .content {
    padding: 2rem;
    padding-top: 0;
  }

  .stars {
    padding-bottom: 1rem;
  }

  .content h3 {
    color: var(--clr-blue);
    font-size: 2rem;
  }

  .content p {
    color: var(--clr-dark-grey);
    font-size: 1.6rem;
    line-height: 1.5;
  }

  .content .price {
    color: var(--clr-blue);
    margin-left: 1rem;
    font-size: 2rem;
  }
`
