import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '../components/Rating'
import { FiChevronRight } from 'react-icons/fi'
import { formatPrice } from '../utils/helpers'
import {
  FaInstagram,
  FaFacebookF,
  FaPinterestP,
  FaRegHeart,
} from 'react-icons/fa'
import { BiShuffle } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createReview, detailsProduct } from '../actions/productActions'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'
import Message from '../components/Message'
import Loading from '../components/Loading'

const ProductDetailsPage = ({ match, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id
  const [qty, setQty] = useState(1)
  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    loading: loadingReviewCreate,
    error: errorReviewCreate,
    success: successReviewCreate,
  } = productReviewCreate

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  useEffect(() => {
    if (successReviewCreate) {
      window.alert('Review Submitted Successfully')
      setRating('')
      setComment('')
      dispatch({ type: PRODUCT_REVIEW_CREATE_RESET })
    }
    dispatch(detailsProduct(productId))
  }, [dispatch, productId, successReviewCreate])

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (comment && rating) {
      dispatch(
        createReview(productId, { rating, comment, name: userInfo.name })
      )
    } else {
      alert('Please enter comment and rating')
    }
  }

  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Message variant='danger' message='Error loading product details' />
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <h3 className='sub-heading'>product</h3>
        <h1 className='heading'>product details</h1>
        <div className='product-detail-row row'>
          <div>
            <img src={product.image} alt={product.name} className='image' />
            <div className='product-details-related-imgs'>
              <img src={product.image} alt={product.name} />
              <img src={product.image} alt={product.name} />
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          <div className='content'>
            <h3>{product.name}</h3>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <div className='price'>{formatPrice(product.price)}</div>
            <p>{product.description}</p>

            <div className='icons-container'>
              <form action='#' className='product-details-form'>
                <div className='select-container'>
                  <select>
                    <option>Select Size</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>XL</option>
                    <option>XXL</option>
                  </select>

                  <select
                    className='quantity'
                    type='number'
                    value={qty}
                    onChange={(e) => {
                      setQty(e.target.value)
                    }}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                {product.countInStock > 0 ? (
                  <button
                    type='submit'
                    className='btn add-to-cart '
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className='out-of-stock'>Stock: Out Of Stock</div>
                )}
              </form>
            </div>
            <hr />
            <ul className='stock-count'>
              <li className='product-sku'>
                Sku: <span>{product._id}</span>
              </li>
              <li className='product-stock-status'>
                Category: <Link to='#'>{product.category}</Link>
              </li>
            </ul>
            <div className='wish-list-container'>
              <Link to='wishlist.html' className='add_to_wishlist'>
                <FaRegHeart /> Add to Wishlist
              </Link>
              <Link to='compare.html'>
                <BiShuffle /> Compare
              </Link>
            </div>
            <p>Share this product</p>
            <div className='share-product-socail-area'>
              <Link to='#'>
                <FaPinterestP />
              </Link>

              <Link to='#'>
                <FaFacebookF />
              </Link>

              <Link to='#'>
                <FaInstagram />
              </Link>
            </div>
          </div>
        </div>
        <div className='description-row'>
          <h3 className='sub-heading'>description</h3>
          <h1 className='heading'>Product description</h1>

          <p>{product.description}</p>
        </div>
        <section className='review' id='review'>
          <h3 className='sub-heading'>reviews</h3>
          <h1 className='heading'>product reviews</h1>

          {product.reviews.length === 0 && (
            <Message message='This Product has no reviews yet...' name='hide' />
          )}

          <div className='swiper-container review-slider'>
            {product.reviews.map((review) => (
              <div key={review._id} className='swiper-wrapper'>
                <div className='swiper-slide slide'>
                  <FiChevronRight className='fa-quote-right' />
                  <div className='user'>
                    <img src={product.image} alt={review.name} />
                    <div className='user-info'>
                      <h3>
                        {review.name} -
                        <span> {review.createdAt.substring(0, 10)}</span>
                      </h3>
                      <Rating
                        rating={product.rating}
                        numReviews={product.numReviews}
                      />
                    </div>
                  </div>
                  <p>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {userInfo ? (
          <div className='product-review-form-row'>
            <div className='rating_wrap'>
              <h3 className='sub-heading'>review</h3>
              <h1 className='heading'>Add review</h1>
            </div>
            <form className='comment-form-area' onSubmit={submitHandler}>
              <div className='row'>
                <label htmlFor='rating'>Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <option value=''>Select your rating</option>
                  <option value='1'>Poor</option>
                  <option value='2'>Fair</option>
                  <option value='3'>Good</option>
                  <option value='4'>Very good</option>
                  <option value='5'>Excelent</option>
                </select>
              </div>
              <div className='row'>
                <label htmlFor='Name'>Name</label>
                <input type='text' required='required' name='Name' />
              </div>
              <div className='row'>
                <label htmlFor='Email'>Email</label>
                <input type='text' required='required' name='email' />
              </div>

              <div className='row'>
                <label htmlFor='comment'>Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>

              <button type='submit' className='btn review-btn'>
                Submit
              </button>

              <div>
                {loadingReviewCreate && <Loading />}
                {errorReviewCreate && (
                  <Message
                    variant='danger'
                    message='error occured'
                    name='hide'
                  />
                )}
              </div>
            </form>
          </div>
        ) : (
          <Message
            message='Please Login To give A Review'
            buttonText='Login'
            url='/signin'
          />
        )}
      </div>
    </Wrapper>
  )
}

export default ProductDetailsPage

const Wrapper = styled.section`
  margin: 5rem 0;
  color: var(--clr-dark-grey);

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
    align-items: center;
  }

  .product-detail-row {
    align-items: flex-start;
  }

  .description-row p {
    text-align: center;
  }
  .row .image {
    flex: 1 1 20rem;
  }

  .alert {
    text-align: center;
  }
  .btn-hide {
    display: none;
  }
  .select-container select {
    width: 20rem;
  }

  .image {
    width: 100%;
  }
  .product-details-related-imgs {
    display: flex;
    margin-top: 1rem;
    justify-content: space-around;
  }
  .product-details-related-imgs img {
    width: 60px;
  }

  .row .content {
    flex: 1 1 45rem;
  }

  .row .content h3 {
    color: var(--clr-blue);
    font-size: 3rem;
    padding: 0.5rem 0;
  }

  .sub-heading {
    padding-top: 10rem;
  }

  p {
    color: var(--clr-dark-grey);
    font-size: 2rem;
    padding: 0.5rem 0;
    line-height: 2;
  }

  .content .price {
    font-size: 2.4rem;
    color: var(--clr-blue);
    font-weight: 500;
    margin-top: 1.7rem;
  }
  .share-product-socail-area {
    margin-top: 1rem;
  }
  .share-product-socail-area a {
    font-size: 2.2rem;
    padding: 1rem;
    box-shadow: var(--light-shadow);
    color: var(--clr-blue);
  }

  .share-product-socail-area a:nth-child(2) {
    margin: 0 2rem;
  }
  .select-container {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    grid-gap: 2rem;
  }
  .row .content .icons-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    padding: 1rem 0;
    margin-top: 0.5rem;
  }

  .row .content .icons-container .icons {
    background: #eee;
    border-radius: 0.5rem;
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex: 1 1 17rem;
    padding: 1.5rem 1rem;
  }

  .review .slide {
    padding: 2rem;
    box-shadow: var(--light-shadow);
    border: 0.1rem solid rgba(0, 0, 0, 0.2);
    border-radius: 0.5rem;
    position: relative;
  }

  .review .slide .fa-quote-right {
    position: absolute;
    top: 2rem;
    right: 2rem;
    font-size: 6rem;
    color: #ccc;
  }

  .review .slide .user {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    padding-bottom: 1.5rem;
  }

  .review .slide .user img {
    height: 7rem;
    width: 7rem;
    border-radius: 50%;
    object-fit: cover;
  }

  .review .slide .user h3 {
    color: var(--clr-blue);
    font-size: 2rem;
    padding-bottom: 0.5rem;
  }

  .rating,
  svg {
    font-size: 1.7rem;
  }

  .btn-hide {
    display: none;
  }

  .review .slide p {
    font-size: 1.7rem;
    line-height: 1.8;
  }

  .comment-form-area {
    margin: 0 auto;
    width: 100%;
  }
  .stock-count {
    margin: 1rem 0;
    line-height: 1.5;
  }
  .stock-count li {
    font-size: 2rem;
  }
  .wish-list-container {
    display: flex;
    flex-wrap: wrap;
    font-size: 2.2rem;
  }

  .wish-list-container svg {
    margin-right: 1.7rem;
  }
  .wish-list-container a {
    display: flex;
    align-items: center;
    color: var(--clr-blue);
  }
  .wish-list-container a:first-child {
    margin-right: 2rem;
  }
  @media (min-width: 800px) {
    .comment-form-area {
      margin: 0 auto;
      width: 50%;
    }
    .review .slide .user {
      flex-direction: row;
    }
    .review .slide p {
      font-size: 2rem;
    }
    .review .slide .user h3 {
      font-size: 2.2rem;
    }
    .rating,
    svg {
      font-size: 2rem;
    }
  }
`
