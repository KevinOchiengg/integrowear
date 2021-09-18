import React, { useEffect } from 'react'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import Loading from './Loading'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import Message from './Message'

function FeaturedProducts() {
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  if (error) {
    return (
      <Message
        message='Error laoding featured products...'
        name='hide'
        variant='danger'
      />
    )
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>our products</h3>
        <h1 className='heading'>featured products</h1>
        {loading ? (
          <Loading />
        ) : (
          <div className='featured'>
            {products.slice(0, 8).map((product) => {
              return <Product key={product._id} product={product} />
            })}
          </div>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 15rem 0 10rem 0;

  .featured {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
    gap: 1.5rem;
  }

  .loading-container {
    margin-top: 10rem;
  }
`

export default FeaturedProducts
