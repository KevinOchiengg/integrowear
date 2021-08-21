import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { createReview, detailsProduct } from '../actions/productActions'
import LoadingBox from '../components/Loading'
import MessageBox from '../components/Message'
import Rating from '../components/Rating'
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants'

export default function ProductPage(props) {
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
    <Wrapper>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant='danger'>{error}</MessageBox>
      ) : (
        <div>
          <Link to='/'>Back to result</Link>
          <div className='small-container single__product'>
            <div className='row'>
              <div className='col-2'>
                <img src={product.image} alt='' id='product__img' />

                <div className='small__img__row'>
                  <div className='small__img__col'>
                    <img src={product.image} alt='' />
                  </div>
                  <div className='small__img__col'>
                    <img src={product.image} alt='' />
                  </div>
                  <div className='small__img__col'>
                    <img src={product.image} alt='' />
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <h1>{product.title} </h1>
                <Rating rating={product.rating} reviews={product.reviews} />
                <h4>Ksh {product.price}</h4>
                <div className='fields-container'>
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
                    {[...Array(product.stock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                {product.stock > 0 ? (
                  <button to='cart' className='btn' onClick={addToCartHandler}>
                    Add to cart
                  </button>
                ) : (
                  <div>Out Of Stock</div>
                )}

                <div className='product-description'>
                  <h1>Description</h1>
                  <p>{product.description}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 id='reviews'>Reviews</h2>
            {product.reviews.length === 0 && (
              <MessageBox>There is no review</MessageBox>
            )}
            <ul>
              {product.reviews.map((review) => (
                <li key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} caption=' '></Rating>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </li>
              ))}
              <li>
                {userInfo ? (
                  <form className='form' onSubmit={submitHandler}>
                    <div>
                      <h2>Write a customer review</h2>
                    </div>
                    <div>
                      <label htmlFor='rating'>Rating</label>
                      <select
                        id='rating'
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value=''>Select...</option>
                        <option value='1'>1- Poor</option>
                        <option value='2'>2- Fair</option>
                        <option value='3'>3- Good</option>
                        <option value='4'>4- Very good</option>
                        <option value='5'>5- Excelent</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='comment'>Comment</label>
                      <textarea
                        id='comment'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <div>
                      <label />
                      <button className='primary' type='submit'>
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
                ) : (
                  <MessageBox>
                    Please <Link to='/signin'>Sign In</Link> to write a review
                  </MessageBox>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .single__product {
    margin-top: 5rem;
  }
  .single__product h1 {
    margin: 30px 10px;
    color: var(--clr-blue);
    font-size: 20px;
  }

  .single__product h4 {
    color: var(--clr-blue);
  }
  .single__product .col-2 img {
    padding: 0;
    width: 400px;
  }

  .single__product p {
    font-size: 14px;
    color: var(--clr-blue);
  }

  .single__product .rating {
    font-size: 18px;
  }
  .single__product select {
    width: 100%;
  }

  .single__product h4 {
    font-size: 20px;
    font-weight: bold;
  }

  .fields-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .ralated-product-title {
    margin: 60px 0;
    flex-wrap: wrap;
  }

  .ralated-product-title p {
    font-size: 30px;
  }

  .ralated-product-title h1,
  h4 {
    color: var(--clr-blue);
  }

  .fields-container .quantity {
    width: 50px;
    height: 30px;
    font-size: 16px;
    margin-left: 10px;
    border: 1px solid #ffd741;
    background: transparent;
  }

  .single__product h3 i {
    color: #ffd741;
  }

  .small__img__row {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .small__img__col {
    flex-basis: 24%;
    cursor: pointer;
  }

  .product-description {
    text-align: center;
  }

  .quantity {
    width: 10px;
  }

  .product-description h1 {
    margin: 20px 10px;
    color: var(--clr-blue);
  }

  .more-products img {
    width: 120px;
  }

  .more-products h4 {
    font-size: 16px;
    color: var(--clr-blue);
    margin-top: 20px;
  }

  .more-products p {
    color: var(--clr-blue);
  }

  @media only screen and (min-width: 800px) {
    .single__product .row {
      text-align: left;
    }

    .single__product .col-2 {
      padding: 20px 0;
    }

    .single__product h1 {
      font-size: 24px;
    }

    .single__product h1,
    .ralated-product-title h1 {
      font-size: 30px;
    }

    .single__product select {
      width: 50%;
    }
  }
`

// ;<div className='small-container single__product'>
//   <div className='row'>
//     <div className='col-2'>
//       <img src={product.image} alt='' id='product__img' />

//       <div className='small__img__row'>
//         <div className='small__img__col'>
//           <img src={product.image} alt='' />
//         </div>
//         <div className='small__img__col'>
//           <img src={product.image} alt='' />
//         </div>
//         <div className='small__img__col'>
//           <img src={product.image} alt='' />
//         </div>
//       </div>
//     </div>
//     <div className='col-2'>
//       <h1>{product.title} </h1>
//       <Rating rating={products.rating} reviews={products.reviews} />
//       <h4>Ksh {product.price}</h4>
//       <div className='fields-container'>
//         <select>
//           <option>Select Size</option>
//           <option>XXL</option>
//           <option>XL</option>
//           <option>Large</option>
//           <option>Medium</option>
//           <option>Small</option>
//         </select>
//         <select
//           className='quantity'
//           type='number'
//           value={quantity}
//           onChange={(e) => {
//             setQuantity(e.target.value)
//           }}
//         >
//           {[...Array(product.stock).keys()].map((x) => (
//             <option key={x + 1} value={x + 1}>
//               {x + 1}
//             </option>
//           ))}
//         </select>
//       </div>
//       {product.stock > 0 ? (
//         <button to='cart' className='btn' onClick={addToCartHandler}>
//           Add to cart
//         </button>
//       ) : (
//         <div>Out Of Stock</div>
//       )}

//       <div className='product-description'>
//         <h1>Description</h1>
//         <p>{product.description}</p>
//       </div>
//     </div>
//   </div>
// </div>
