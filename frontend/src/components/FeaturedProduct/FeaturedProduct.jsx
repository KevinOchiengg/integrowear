import React, { useEffect } from 'react'
import './FeaturedProduct.css'
import Product from '../Product/Product'
import { useDispatch, useSelector } from 'react-redux'
import LoadingBox from '../LoadingBox/LoadingBox'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MessageBox from '../MessageBox/MessageBox'
import { listProducts } from '../../actions/productActions'

function FeaturedProduct() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])
  return (
    <div className='small-container'>
      <h2 className='title'>Featured Products</h2>
      <div className='row'>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <ErrorMessage>{error}</ErrorMessage>
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
    </div>
  )
}

export default FeaturedProduct
