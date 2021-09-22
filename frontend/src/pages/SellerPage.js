import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import { detailsUser } from '../actions/userActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Product from '../components/Product'
import Rating from '../components/Rating'

export default function SellerPage(props) {
  const sellerId = props.match.params.id
  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const productList = useSelector((state) => state.productList)
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(detailsUser(sellerId))
    dispatch(listProducts({ seller: sellerId }))
  }, [dispatch, sellerId])
  return (
    <Wrapper>
      <div className='col-1 section-center'>
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant='danger' message='error occured' name='hide' />
        ) : (
          <ul className='card card-body'>
            <li>
              <div className='row start'>
                <div className='p-1'>
                  <img
                    className='small'
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></img>
                </div>
                <div className='p-1'>
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              />
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className='col-3'>
        {loadingProducts ? (
          <Loading />
        ) : errorProducts ? (
          <Message variant='danger' message='error occured' name='hide' />
        ) : (
          <>
            {products.length === 0 && (
              <Message message='No Product Found' name='hide' />
            )}
            <div className='row center'>
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;
  .btn-hide {
    display: none;
  }
`
