import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from './Loading'
import MessageBox from './Message'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'

function FeaturedProduct() {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='title'>Featured Products</h3>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant='danger'>
            Oops! Error fetching Products
          </MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className='row'>
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
  margin: 6rem auto;

  .row {
    display: grid;
  }

  @media (min-width: 768px) {
    .row {
      grid-template-columns: repeat(3, 1fr);
    }
  }
`
