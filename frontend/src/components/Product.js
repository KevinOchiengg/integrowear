import React from 'react'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import styled from 'styled-components'
import { IoIosBasket } from 'react-icons/io'
import { BiShuffle } from 'react-icons/bi'
import { AiOutlineHeart } from 'react-icons/ai'

export default function Product(props) {
  const { product } = props

  return (
    <Wrapper>
      <div className='single-product-area'>
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
          <div className='buttons__container'>
            <button className='btn'>Add</button>
            <button className='btn'>
              <Link to={`/product/${product._id}`}>View</Link>
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
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
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    margin-bottom: 2px;
    border-radius: 5px;
  }
  .product-thumb {
    position: relative;
  }
  .product-thumb a {
    display: block;
  }
  .product-thumb a img {
    width: 100%;
    border-radius: 5px;
  }
  .product-thumb .action-links {
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .action-links a {
    background-color: var(--clr-white);
    border-radius: 100%;
    color: var(--clr-blue);
    display: inline-block;
    font-weight: normal;
    height: 43px;
    line-height: 48px;
    text-align: center;
    vertical-align: top;
    width: 43px;
    transition: var(--transition);
  }

  .action-links a {
    opacity: 0;
    transform: scale(0.8) rotate(-45deg);
  }
  .single-product-area:hover .action-links a {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }

  .label-product {
    background: var(--clr-yellow);
    color: var(--clr-blue);
    font-size: 0.8em;
    font-weight: 500;
    position: absolute;
    border-radius: 3px;
    left: 13px;
    text-align: center;
    text-transform: capitalize;
    top: 13px;
    z-index: 0;
    padding: 0.2em;
  }

  .product-rating {
    margin: 1em 0;
  }
  .product-caption {
    width: 100%;
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid var(--clr-light-grey);
  }
  .product-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0;
    text-transform: capitalize;
  }
  .new-price {
    color: var(--clr-yellow);
    font-weight: 400;
    margin-right: 10px;
  }
  .old-price {
    font-size: 15px;
    text-decoration: line-through;
    color: #555;
    padding-left: 5px;
  }

  .nav,
  .product-relevance {
    display: flex;
    align-items: center;
    grid-gap: 1em;
    margin: 0 1em;
  }
  svg {
    font-size: 1.25rem;
    &:hover {
      color: var(--clr-hover);
      transition: var(--transition);
    }
  }
  .buttons__container {
    margin-top: 15px;
  }
  .buttons__container .btn {
    margin: 0 10px;
  }
  .shop-sidebar {
    margin: 1.8em 0;
  }

  .products-category-nav {
    padding: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  .sidebar-tag {
    display: flex;
    grid-gap: 1em;
    flex-wrap: wrap;
  }
  @media (min-width: 800px) {
    .single-product-area {
      width: 250px;
    }
  }
`
