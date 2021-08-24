import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import styled from 'styled-components'
import { IoIosBasket } from 'react-icons/io'
import { BiShuffle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'

export default function Product({ product }) {
  return (
    <Wrapper>
      <article className='single-product-area'>
        <figure className='product-thumb'>
          <Link to={`/product/${product._id}`}>
            <img
              className='primary-image'
              src={product.image}
              alt={product.name}
            />
          </Link>
          <div className='label-product label_new'>New</div>
          <div className='action-links'>
            <Link to='cart' className='cart-btn'>
              <IoIosBasket />
            </Link>
            <Link to='/' className='wishlist-btn'>
              <AiOutlineHeart />
            </Link>
            <Link to='#' className='quick-view'>
              <BiShuffle />
            </Link>
          </div>
        </figure>
        <div className='product-caption'>
          <h4 className='product-name'>
            <Link to={`/product/${product._id}`}>{product.name}</Link>
          </h4>
          <div className='product-rating'>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </div>
          <div className='price-box'>
            <span className='new-price'>Ksh {product.price}</span>
            <span className='old-price'>Ksh 2000</span>
          </div>
        </div>
      </article>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 2em 0;

  a {
    color: var(--clr-dark-grey);
  }

  .action-links a {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--clr-white);
    border-radius: 100%;
    color: var(--clr-blue);
    height: 3em;
    width: 3em;
    transition: var(--transition);
    margin: 0 5px;
    &:hover {
      background-color: var(--clr-yellow);
      color: var(--clr-blue);
    }
    opacity: 0;
    transform: scale(0.8) rotate(-45deg);
  }
  .has-sub ul li {
    margin: 1em 0;
  }
  .single-product-area {
    position: relative;
    border-radius: 5px;
    margin: 0 auto;
    width: 8em;
    height: 10em;
  }
  .product-thumb {
    margin: 0 auto;
    width: 100%;
    position: relative;
  }
  .product-thumb a {
    display: block;
  }
  .product-thumb a img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .product-thumb .action-links {
    position: absolute;
    flex-wrap: wrap;
    top: 40%;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .action-links a {
    display: flex;
    background-color: var(--clr-white);
    border-radius: 100%;
    color: var(--clr-blue);
    font-size: 1rem;

    height: 2em;
    text-align: center;
    width: 2em;
    transition: var(--transition);
    transform: scale(0.8) rotate(-45deg);
    opacity: 0;
  }
  .single-product-area:hover .action-links a {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .label-product {
    background: var(--clr-yellow);
    color: var(--clr-blue);
    font-size: 0.6em;
    font-weight: 500;
    position: absolute;
    border-radius: 3px;
    left: 5px;
    text-align: center;
    text-transform: capitalize;
    top: 5px;
    z-index: 0;
    padding: 0.2em;
  }

  .product-rating {
    margin: 1em 0;
  }
  .product-caption {
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }
  .product-name {
    display: block;
    font-size: 0.725rem;
    font-weight: 500;
    padding: 0;
    text-transform: capitalize;
  }
  .price-box {
    font-size: 0.725rem;
  }
  .new-price {
    color: var(--clr-yellow);
    font-weight: 400;
    margin-right: 10px;
  }
  .old-price {
    text-decoration: line-through;
    color: var(--clr-light-grey);
  }

  @media (min-width: 800px) {
    .single-product-area {
      width: 12em;
      height: 10em;
      margin-bottom: 4em;
    }
    .action-links a {
      height: 3em;
      width: 3em;
    }
    .label-product,
    .product-name,
    .price-box {
      font-size: 0.8em;
    }
  }
`
