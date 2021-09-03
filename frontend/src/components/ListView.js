import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import Product from './Product'

const ListView = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products } = productList
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <Wrapper>
      <div className='products-list'>
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default ListView
