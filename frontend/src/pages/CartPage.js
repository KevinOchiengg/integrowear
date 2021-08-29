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
      <div className='small-container cart-page'>
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
              <h3 className='title'>Your Shopping</h3>
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
                              <Rating />
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
                <Link
                  to='/signin?redirect=shipping'
                  className='checkout-btn btn'
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout &#8594;
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 6em 0;

  table {
    width: 100%;
    border-collapse: collapse;
  }

  .btn {
    margin-top: 0.6em;
  }

  .cart-info {
    display: flex;
    flex-wrap: wrap;
    margin-top: 2em;
  }

  th {
    text-align: left;
    padding: 1em;
    color: var(--clr-white);
    background: var(--clr-blue);
    font-size: 0.6rem;
  }

  td:nth-child(2) {
    text-align: left;
  }
  th:last-child,
  td:last-child {
    text-align: right;
  }
  p {
    margin-bottom: 0.6em;
  }

  h3 {
    margin-bottom: 1.5em;
  }
  select {
    width: 4em;
    padding: 5px;
    height: 3em;
  }

  td a {
    color: var(--clr-blue);
    font-size: 12px;
    &:hover {
      color: var(--clr-yellow);
    }
    transition: var(--transition);
  }

  td img {
    width: 80px;
    height: 80px;
  }

  .total-price {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .total-price td {
    padding: 0.6em 0;
  }

  .total-price table {
    border-top: 3px solid var(--clr-yellow);
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 800px) {
    .checkout-items {
      margin-left: 1em;
    }
    .total-price {
      align-items: flex-end;
      margin: 0 1.5em;
    }
    td img {
      width: 5em;
      height: 5em;
    }
    th {
      font-size: 1rem;
    }

    td,
    th {
      padding: 1em 2em;
    }
    .checkout-btn {
      padding: 0.8em 1.2em;
      font-size: 1rem;
      margin-right: 11.5em;
    }
  } ;
`
