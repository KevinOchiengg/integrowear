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
  const [qty, setQty] = useState(1)
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
        <div className='product-layout-list'>
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
              <span className='old-price'>ksh 2,000</span>
            </div>

            <p>{product.description}</p>
          </div>

          <div className='product-action-area'>
            <ul className='stock-cont'>
              <li className='product-sku'>
                Sku: <span>P006</span>
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
                <li className='add-to-wishlist'>
                  <Link
                    to={`/wishlist/${product._id}?qty=${qty}`}
                    className='add_to_wishlist'
                  >
                    <AiOutlineHeart /> Add to Wishlist
                  </Link>
                </li>
              </ul>
              <div className='add-to-cart-btn-container'>
                <Link
                  to={`/cart/${product._id}?qty=${qty}`}
                  className='btn add_to_wishlist'
                >
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

  .new-price {
    color: var(--clr-blue);
    font-weight: 400;
    margin-right: 10px;
  }

  .price-box {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
  .old-price {
    text-decoration: line-through;
    color: var(--clr-light-grey);
  }
  h4 {
    margin-bottom: 0.4em;
  }
  .product-stock-status {
    margin: 1.7rem 0;
  }
`

export default GridView
