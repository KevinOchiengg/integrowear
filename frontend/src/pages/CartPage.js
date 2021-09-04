import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'
import Rating from '../components/Rating'

export default function CartPage(props) {
  const productId = props.match.params.id

  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1
  const cart = useSelector((state) => state.cart)
  const { cartItems, error } = cart
  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping')
  }
  return (
    <Wrapper>
      <div className='section-center'>
        {error && <Message variant='danger'>{error}</Message>}
        {cartItems.length === 0 ? (
          <Message
            message='Oops! Your Cart is Empty...'
            buttonText='Go Shopping'
            url='/products'
          />
        ) : (
          <>
            <h3 className='sub-heading'>Shopping</h3>
            <h1 className='heading'>Your Shopping</h1>
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>QUANTITY</th>
                  <th>SUBTOTAL</th>
                </tr>
              </thead>

              <tbody>
                {cartItems.map((item) => {
                  return (
                    <tr key={item.name}>
                      <td>
                        <div className='cart-info'>
                          <img src={item.image} alt='' />
                          <div className='checkout-items'>
                            <Link to={'/product/' + item.product}>
                              <h5>{item.name}</h5>
                            </Link>

                            <p>Price: Ksh {item.price}</p>
                            {/* <Rating /> */}
                            <button
                              className='btn'
                              onClick={() =>
                                removeFromCartHandler(item.product)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <select
                          className='quantity'
                          value={item.quantity}
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          {[...Array(item.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td>Ksh {item.price}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='total-price'>
              <table>
                <tbody>
                  <tr>
                    <td>Total Items</td>
                    <td>{cartItems.reduce((a, c) => a + c.qty, 0)} item</td>
                  </tr>
                  <tr>
                    <td>Total Price</td>
                    <td>
                      Ksh {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className='checkout-btn-container'>
                <Link to='/shipping'>
                  <button
                    type='button'
                    className='checkout-btn btn'
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </button>
                </Link>
                <Link to='/products'>
                  <button
                    type='button'
                    className='shopping-btn btn'
                    disabled={cartItems.length === 0}
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;

  color: var(--clr-blue);
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 1.7rem;
  }

  .btn {
    margin-top: 1rem;
  }

  .cart-info {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2em;
  }

  th {
    text-align: left;
    padding: 1rem;
    color: var(--clr-white);
    background: var(--clr-blue);
    font-size: 1rem;
    border: none;
  }

  td:nth-child(2) {
    text-align: left;
  }
  td:nth-child(1) {
    text-align: left;
  }
  th:last-child,
  td:last-child {
    text-align: right;
  }
  p {
    margin-bottom: 0.6rem;
  }
  td {
    text-align: center;
    border: none;
  }
  h3 {
    margin-bottom: 1.5em;
  }
  select {
    width: 4rem;
    padding: 5px;
    height: 4rem;
  }

  .checkout-btn-container {
    display: flex;
    width: 100%;
    align-items: center;
    grid-gap: 2rem;
    flex-wrap: wrap;
    border: 2px solid red;
  }

  td a {
    color: var(--clr-blue);
    font-size: 2rem;
    &:hover {
      color: var(--clr-yellow);
    }
    transition: var(--transition);
  }

  td img {
    width: 5rem;
  }

  .shopping-btn {
    margin: 0;
  }
  .total-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .total-price td {
    padding: 0.6em 0;
  }

  button {
    font-size: 1rem;
  }

  .total-price table {
    border-top: 3px solid var(--clr-yellow);
    width: 100%;
  }

  @media (min-width: 800px) {
    table {
      font-size: 2rem;
    }
    .checkout-items {
      margin-left: 1em;
    }
    .total-price {
      align-items: flex-end;
      margin: 0 1.5em;
    }
    td img {
      width: 5rem;
      height: 5rem;
    }
    th {
      font-size: 1.7rem;
    }

    td:first-child {
      display: flex;
    }
    .checkout-btn {
      font-size: 2rem;
    }
  } ;
`
