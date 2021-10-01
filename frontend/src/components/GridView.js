import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Rating from './Rating'
import Loading from './Loading'
import Message from './Message'
import { formatPrice } from '../utils/helpers'

const GridView = () => {
  const [qty] = useState(1)
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  if (loading) {
    return <Loading />
  }
  if (error) {
    return (
      <Message message='Error Loading products' name='hide' variant='danger' />
    )
  }

  if (products < 1) {
    return <Message message='No product match your search...' name='hide' />
  }
  return (
    <Wrapper>
      {products.map((product) => (
        <div key={product._id} className='product-layout-list'>
          <div className='product-image'>
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} />
            </Link>
          </div>

          <div className='product-content-list'>
            <h4>
              <Link to={`/product/${product._id}`} className='product-name'>
                {product.name}
              </Link>
            </h4>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <div className='price-box'>
              <span className='new-price'>{formatPrice(product.price)}</span>
            </div>

            <p>{product.description.slice(0, 300)}...</p>
          </div>

          <div className='product-action-area'>
            <ul className='stock-cont'>
              <li className='product-sku'>
                Sku: <span>P0023</span>
              </li>
              <li className='product-stock-status'>
                Availability:
                {product.countInStock > 0 ? (
                  <span className='in-stock'>In Stock</span>
                ) : (
                  <span className='in-stock'>Out of stock</span>
                )}
              </li>
            </ul>
            <div className='product-button'>
              <ul className='actions'>
                <li>
                  <Link
                    to={`/wishlist/${product._id}?qty=${qty}`}
                    className='add_to_wishlist'
                  >
                    <AiOutlineHeart /> Add to Wishlist
                  </Link>
                </li>
              </ul>
              <div className='add-to-cart-btn-container'>
                <Link to={`/cart/${product._id}?qty=${qty}`} className='btn'>
                  Add to cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .product-content-list h4 a {
    font-size: 2.2rem;
    color: var(--clr-blue);
  }

  .product-layout-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  .product-content-list {
    margin: 1rem 0;
  }

  .product-action-area {
    width: 100%;
  }
  .add-to-cart-btn-container {
    margin-top: 0.5em;
  }

  @media (min-width: 800px) {
    .product-layout-list {
      flex-direction: row;
      justify-content: space-between;
    }
    .product-image {
      width: 20%;
    }
    .product-content-list {
      width: 50%;
    }

    .product-action-area {
      width: 23%;
    }
  }
  .new-price {
    color: var(--clr-blue);
    font-weight: 400;
    margin-right: 10px;
  }

  .add_to_wishlist {
    display: flex;
    align-items: center;
  }

  .add_to_wishlist svg {
    font-size: 3rem;
    margin-right: 1rem;
  }
  .price-box {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  h4 {
    margin-bottom: 0.4em;
  }
  .product-stock-status {
    margin: 1.7rem 0;
  }
`

export default GridView
