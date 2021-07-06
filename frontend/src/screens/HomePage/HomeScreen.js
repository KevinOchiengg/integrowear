import React, { useEffect } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import Product from '../../components/Product/Product'
import LoadingBox from '../../components/LoadingBox/LoadingBox'
import MessageBox from '../../components/MessageBox/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../../actions/productActions'
import { listTopSellers } from '../../actions/userActions'
import { Link } from 'react-router-dom'
import Testimonial from '../../components/Testimonial/Testimonial'
import FeaturedProduct from '../../components/FeaturedProduct/FeaturedProduct'
import './HomePage.css'
import Hero from '../../components/Hero/Hero'
import Footer from '../../components/Footer/Footer'
import AdSection from '../../components/AdSection/AdSection'
import NavigationBar from '../../components/NavigationBar/NavigationBar'

export default function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userTopSellersList = useSelector((state) => state.userTopSellersList)
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList

  useEffect(() => {
    dispatch(listProducts({}))
    dispatch(listTopSellers())
  }, [dispatch])
  return (
    <>
      <Hero />
      <div className='small-container'>
        <h2 className='title'>Featured Products</h2>
        <div className='row'>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant='danger'>{error}</MessageBox>
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
      <Testimonial />
      <AdSection />
    </>
  )
}
