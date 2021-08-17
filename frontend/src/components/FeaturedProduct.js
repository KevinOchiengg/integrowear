import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from './LoadingBox'
import ErrorMessage from './ErrorMessage'
import MessageBox from './MessageBox'
import { listProducts } from '../actions/productActions'
import styled from 'styled-components'

function FeaturedProduct() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  return (
    <Wrapper className='small-container'>
      <h2 className='title'>Featured Products</h2>
      <div className='product-container'>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className='products-list'>
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  )
}

export default FeaturedProduct

const Wrapper = styled.section`
  max-width: 1080px;
  margin: auto;
  padding-right: 25px;
  padding-left: 25px;
  @media (min-width: 800px) {
    .products-list-section {
      width: 72%;
    }
    .products-category-nav {
      width: 25%;
    }
    .single-product-area {
      margin: 0;
    }

    .products-list {
      display: flex;
      grid-gap: 2em;
      margin: 2em 0;
      border: 2px solid yellow;
    }
  }
`
