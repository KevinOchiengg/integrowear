import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions'
import CheckoutSteps from '../components/CheckoutSteps'
import { ORDER_CREATE_RESET } from '../constants/orderConstants'
import Loading from '../components/Loading'
import styled from 'styled-components'
import Message from '../components/Message'
import { formatPrice } from '../utils/helpers'

export default function PlaceOrderPage(props) {
  const cart = useSelector((state) => state.cart)
  if (!cart.paymentMethod) {
    props.history.push('/payment')
  }
  const orderCreate = useSelector((state) => state.orderCreate)
  const { loading, success, error, order } = orderCreate
  const toPrice = (num) => Number(num) // 5.123 => "5.12" => 5.12
  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  )
  cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : toPrice(10)
  cart.taxPrice = toPrice(0.15 * cart.itemsPrice)
  cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice
  const dispatch = useDispatch()
  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }))
  }
  useEffect(() => {
    if (success) {
      props.history.push(`/order/${order._id}`)
      dispatch({ type: ORDER_CREATE_RESET })
    }
  }, [dispatch, order, props.history, success])
  return (
    <Wrapper>
      <div className='section-center'>
        <CheckoutSteps step1 step2 step3 step4 />
        <div className='row top'>
          <div className='col-2'>
            <ul>
              <li>
                <div className='card card-body'>
                  <h3>Shipping</h3>
                  <p>
                    <strong>Name:</strong> {cart.shippingAddress.fullName}
                    <br />
                    <strong>Address: </strong> {cart.shippingAddress.address},
                    {cart.shippingAddress.city},
                    {cart.shippingAddress.postalCode},
                    {cart.shippingAddress.country}
                  </p>
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> {cart.paymentMethod}
                  </p>
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h2>Order Items</h2>
                  <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.product}>
                        <div className='row'>
                          <div>
                            <img
                              src={item.image}
                              alt={item.name}
                              className='small'
                            ></img>
                          </div>
                          <div className='min-30'>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>

                          <div>
                            {item.qty} x {formatPrice(item.price)} ={' '}
                            {formatPrice(item.qty * item.price)}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div className='col-1'>
            <div className='card card-body'>
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className='row'>
                    <div>Items</div>
                    <div>{formatPrice(cart.itemsPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Shipping</div>
                    <div>{formatPrice(cart.shippingPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Tax</div>
                    <div>{formatPrice(cart.taxPrice)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>{formatPrice(cart.totalPrice)}</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type='button'
                    onClick={placeOrderHandler}
                    className='primary btn block'
                    disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
                {loading && <Loading />}
                {error && (
                  <Message
                    message='error occured please check Your internet connection'
                    variant='danger'
                    name='hide'
                  />
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  margin: 12rem 0;
  font-size: 2.2rem;
  color: var(--clr-blue);

  .card {
    border: 0.1rem #c0c0c0 solid;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    margin: 1rem;
    box-shadow: var(--light-shadow);
  }
  .card-body {
    padding: 2rem;
  }
  .btn-hide {
    display: none;
  }

  .card-body > * {
    margin-bottom: 1.7rem;
  }
  .card-body ul li {
    margin: 2rem auto;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
  .row.center {
    justify-content: center;
  }
  .row.top {
    align-items: flex-start;
    margin-top: 5rem;
  }
  .row.start {
    justify-content: flex-start;
  }
  .col-1 {
    flex: 1 1 25rem;
  }
  .col-2 {
    flex: 2 1 50rem;
  }
  .col-3 {
    flex: 32 1 75rem;
  }
  .min-30 {
    min-width: 30rem;
  }
  .p-1 {
    padding: 1rem;
  }
  img.small {
    max-width: 5rem;
    width: 100%;
  }
`
