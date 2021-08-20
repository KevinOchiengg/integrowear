import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Rating from '../components/Rating'
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
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'

const ProductDetails = (props) => {
  const dispatch = useDispatch()
  const productId = props.match.params.id
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
    props.history.push(`/cart/${productId}?qty=${qty}`)
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
  return (
    <Wrapper className='product-details-container'>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <>
          <div className='section-center'>
            <div className='product-details-row'>
              <div className='product-details-imgs-container'>
                <div className='product-details-img'>
                  <img src={product.image} alt='product' />
                </div>
                <div className='product-details-related-imgs'>
                  <img src={product.image} alt='product' />
                  <img src={product.image} alt='product' />
                  <img src={product.image} alt='product' />
                </div>
              </div>

              <div className='product-details-info'>
                <h3>{product.name}</h3>
                <Rating rating={product.rating} reviews={product.reviews} />
                <div className='price-box'>
                  <span class='new-price'>Ksh {product.price}</span>
                  <span class='old-price'>Ksh. 3500</span>
                </div>
                <div className='product-details-description'>
                  <p>{product.description}</p>
                </div>
                <div className='add-to-cart-btn-container'>
                  <form action='#' className='product-details-form'>
                    <select>
                      <option>Select Size</option>
                      <option>XXL</option>
                      <option>XL</option>
                      <option>Large</option>
                      <option>Medium</option>
                      <option>Small</option>
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
                <div className='wish-list-btn-container'>
                  <Link to='wishlist.html' className='add_to_wishlist'>
                    <FaRegHeart /> Add to Wishlist
                  </Link>
                  <Link to='compare.html'>
                    <BiShuffle /> Compare
                  </Link>
                </div>
                <hr />
                <div className='category-info-container'>
                  <ul className='stock-count'>
                    <li className='product-sku'>
                      Sku: <span>{product._id}</span>
                    </li>
                    <li className='product-stock-status'>
                      Categories: <Link to='#'>{product.category}</Link>
                    </li>
                    <li class='product-stock-status'>
                      Tag: <Link to='/products'>{product.category}</Link>
                    </li>
                  </ul>
                </div>
                <div class='share-product-socail-area'>
                  <p>Share this product</p>
                  <ul className='single-product-share'>
                    <li>
                      <Link to='#'>
                        <FaPinterestP />
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <FaFacebookF />
                      </Link>
                    </li>
                    <li>
                      <Link to='#'>
                        <FaInstagram />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className='product-description-container'>
            <div className='section-center'>
              <div className='product-description-row'>
                <h4>Description</h4>

                <div className='product-description'>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='product-reviews-container'>
            <div className='section-center'>
              <h4>Reviews</h4>
              {product.reviews.length === 0 && (
                <MessageBox>There is no review</MessageBox>
              )}
              <div className='reviews-product-row'>
                {product.reviews.map((review) => (
                  <>
                    <div className='review-img-container'>
                      <img
                        className='primary-image'
                        src={product.image}
                        alt=''
                      />
                    </div>
                    <div className='review_details'>
                      <div className='review_info '>
                        <Rating rating={review.rating} caption=''></Rating>
                        <h5>
                          {review.name} -
                          <span> {review.createdAt.substring(0, 10)}</span>
                        </h5>
                      </div>
                      <p>{review.comment}</p>
                    </div>
                  </>
                ))}
              </div>
            </div>

            <div className='product-review-form'>
              <div className='section-center'>
                {userInfo ? (
                  <div className='product-review-form-row'>
                    <div className='rating_wrap'>
                      <h4 className='rating-title-1'>Add a review </h4>
                      <p>
                        Your email address will not be published. Required
                        fields are marked *
                      </p>
                    </div>
                    <form
                      action='#'
                      className='comment-form-area'
                      onSubmit={submitHandler}
                    >
                      <div className='row'>
                        <label>
                          Your Rating <span className='required'>*</span>
                        </label>
                        <select
                          id='rating'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>Poor</option>
                          <option value='2'>Fair</option>
                          <option value='3'>Good</option>
                          <option value='4'>Very good</option>
                          <option value='5'>Excelent</option>
                        </select>
                      </div>
                      <div className='row'>
                        <label>
                          Name <span className='required'>*</span>
                        </label>
                        <input type='text' required='required' name='Name' />
                      </div>
                      <div class='row'>
                        <label>
                          Email <span className='required'>*</span>
                        </label>
                        <input type='text' required='required' name='email' />
                      </div>

                      <div class='row'>
                        <label>Comment</label>
                        <textarea
                          id='comment'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                      </div>
                      <div class='row'>
                        <button type='submit' className='btn review-btn'>
                          Submit
                        </button>
                      </div>
                      <div>
                        {loadingReviewCreate && <LoadingBox></LoadingBox>}
                        {errorReviewCreate && (
                          <MessageBox variant='danger'>
                            {errorReviewCreate}
                          </MessageBox>
                        )}
                      </div>
                    </form>
                  </div>
                ) : (
                  <MessageBox>
                    Please <Link to='/login'>Sign In</Link> to write a review
                  </MessageBox>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </Wrapper>
  )
}

export default ProductDetails

const Wrapper = styled.section`
  margin-top: 4rem;
  color: var(--clr-dark-grey);
  padding-top: 4em;

  .section-center {
    margin: 2em auto;
    max-width: var(--max-width);
  }
  .rating {
    font-size: 1.2rem;
    justify-content: flex-start;
  }
  .product-details-related-imgs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 1em 0 0.6em 0;
  }

  .product-details-form select {
    width: 20%;
    margin: 1em 0;
  }
  .product-details-form select:first-child {
    margin-right: 1em;
  }
  .product-details-related-imgs img {
    width: 60px;
  }
  .out-of-stock {
    margin: 1em 0;
  }
  .price-box {
    margin: 1em 0;
  }
  .wish-list-btn-container {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .wish-list-btn-container a {
    color: var(--clr-dark-grey);
  }

  .wish-list-btn-container a:first-child {
    margin-bottom: 0.8em;
  }
  .new-price {
    background: none;
    font-size: 1em;
    text-decoration: none;
    color: var(--clr-yellow);
    font-size: 16px;
    font-weight: 500;
  }

  .old-price {
    color: var(--clr-dark-grey);
    display: inline-block;
    font-size: 1rem;
    font-weight: normal;
    margin-left: 1em;
    text-decoration: line-through;
    filter: alpha(opacity=100);
    opacity: 1;
  }
  .input-text {
    width: 2.5em;
    height: 2.5em;
    margin-right: 1.6em;
  }
  p,
  li {
    font-size: 0.825em;
    line-height: 1.6rem;
    letter-spacing: var(--spacing);
  }

  .wish-list-btn-container {
    margin-bottom: 1em;
  }
  .wish-list-btn-container svg {
    margin-right: 1em;
  }
  .add_to_wishlist {
    margin-right: 1.6em;
  }
  .category-info-container li {
    margin: 0.6em 0;
    letter-spacing: var(--spacing);
  }

  label {
    margin-bottom: 0.8em;
  }

  input,
  select {
    border: 1px solid var(--clr-light-grey);
    height: 3.5em;
    width: 60%;
  }

  .share-product-socail-area {
    display: flex;
    align-items: center;
  }
  .single-product-share {
    display: flex;
  }
  .single-product-share svg {
    margin: 0.8em;
  }

  .product-description-nav {
    display: flex;
    margin-bottom: 1em;
  }

  .product-description-nav li:first-child {
    margin-right: 1.6em;
  }

  .review-img-container {
    margin-bottom: 1.4em;
    max-width: 4em;
  }

  .comment-form-area {
    margin-top: 2em;
  }

  .row {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 1.5em 0;
  }

  .review_info h5 {
    margin-top: 1em;
  }
  .review-btn {
    margin-top: 0;
    padding: 0.8em 0;
    width: 100%;
    letter-spacing: var(--spacing);
    color: var(--clr-blue);
  }
  h6 {
    margin-top: 1em;
  }
  @media (min-width: 475px) {
    .reviews-product-row {
      display: flex;
    }
    .review-img-container {
      margin-right: 1.4em;
    }
    .wish-list-btn-container a:first-child {
      margin-bottom: 0;
    }
  }
  @media (min-width: 800px) {
    .product-details-row {
      display: flex;
      justify-content: space-between;
    }

    .review-btn {
      width: 15%;
    }
    .wish-list-btn-container a:first-child {
      margin-bottom: 0;
    }

    .row input,
    .row textarea {
      width: 60%;
    }

    .product-details-imgs-container {
      width: 40%;
    }
    .product-details-info {
      width: 57%;
    }
    .product-details-info h3 {
      margin: 10px;
    }
    .product-details-related-imgs img {
      width: 80px;
    }
  }
`
