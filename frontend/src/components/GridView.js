import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineHeart } from 'react-icons/ai'
import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Rating from './Rating'

const GridView = () => {
  const dispatch = useDispatch()

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const productList = useSelector((state) => state.productList)
  const { products } = productList
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])
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
            <div className='price-box'>
              <span className='new-price'>Ksh {product.price}</span>
              <span className='old-price'>ksh 2,000</span>
            </div>

            <Rating rating={product.rating} numReviews={product.numReviews} />

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
                  <Link to='/' className='add_to_wishlist'>
                    <AiOutlineHeart /> Add to Wishlist
                  </Link>
                </li>
              </ul>
              <div className='add-to-cart-btn-container'>
                <button className='btn add-to-cart-btn'>Add to cart</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default GridView
