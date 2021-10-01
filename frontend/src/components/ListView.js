import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import Loading from './Loading'
import Message from './Message'
import Product from './Product'

const ListView = () => {
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
    <Wrapper className='products-list'>
      {products.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(30rem, 1fr));
  gap: 1.5rem;
`

export default ListView
