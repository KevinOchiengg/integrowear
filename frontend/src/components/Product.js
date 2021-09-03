import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { formatPrice } from '../utils/helpers'

export default function Product({ product }) {
  return (
    <Wrapper>
      <article className='box'>
        <div className='image'>
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} />
          </Link>

          <Link to='/' className='heart'>
            <AiOutlineHeart />
          </Link>
        </div>
        <div className='content'>
          <div className='stars'>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <Link to={`/product/${product._id}`}>
            <h3>{product.name.substring(0, 22)}</h3>
          </Link>

          <p>{product.description.substring(0, 50)}...</p>
          <button className='btn'>add to cart</button>
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
    box-shadow: var(--dark-shadow);
    margin: 0 auto;
  }

  .box .image {
    height: 25rem;
    width: 100%;
    padding: 1.5rem;
    overflow: hidden;
    position: relative;
  }

  .box .image img {
    height: 100%;
    width: 100%;
    border-radius: 0.5rem;
    object-fit: cover;
  }

  .box .image .heart {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    height: 5rem;
    width: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size: 2rem;
    background: var(--clr-white);
    border-radius: 50%;
    color: var(--clr-blue);
  }

  .box .image .heart:hover {
    background-color: var(--clr-blue);
    color: var(--clr-white);
  }

  .box .content {
    padding: 2rem;
    padding-top: 0;
  }

  .box .content .stars {
    padding-bottom: 1rem;
  }

  .box .content h3 {
    color: var(--clr-blue);
    font-size: 2.5rem;
  }

  .box .content p {
    color: var(--clr-dark-grey);
    font-size: 1.6rem;
    line-height: 1.5;
  }

  .box .content .price {
    color: var(--clr-blue);
    margin-left: 1rem;
    font-size: 2.5rem;
  }
`
