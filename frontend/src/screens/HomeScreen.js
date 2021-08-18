import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Testimonial from '../components/Testimonial'
import Hero from '../components/Hero'
import AdSection from '../components/AdSection'
import styled from 'styled-components'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])
  return (
    <>
      <Hero />
      <Wrapper>
        <div className='section-center'>
          <h2 className='title'>Featured Products</h2>
          <div className='product-container'>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant='danger'>
                Oops! Error fetching Products
              </MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className='row'>
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Wrapper>
      <Testimonial />
      <AdSection />
    </>
  )
}

const Wrapper = styled.section`
  margin: 6rem auto;

  @media (min-width: 800px) {
    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      grid-gap: 2em;
      flex-wrap: wrap;
    }
  }
`
