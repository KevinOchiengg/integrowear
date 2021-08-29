import Axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from '../constants/orderConstants'
import styled from 'styled-components'

export default function OrderPage(props) {
  const orderId = props.match.params.id
  const [sdkReady, setSdkReady] = useState(false)
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay
  const orderDeliver = useSelector((state) => state.orderDeliver)
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver
  const dispatch = useDispatch()
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get('/api/config/paypal')
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
    }
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET })
      dispatch({ type: ORDER_DELIVER_RESET })
      dispatch(detailsOrder(orderId))
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript()
        } else {
          setSdkReady(true)
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(order, paymentResult))
  }
  const deliverHandler = () => {
    dispatch(deliverOrder(order._id))
  }

  return loading ? (
    <Loading />
  ) : error ? (
    <Message message='Error ocurred' variant='danger'>
      {error}
    </Message>
  ) : (
    <Wrapper>
      <div className='section-center'>
        <h3>Order {order._id}</h3>
        <div className='row top'>
          <div className='col-2'>
            <ul>
              <li>
                <div className='card card-body'>
                  <h3>Shippring</h3>
                  <p>
                    <strong>Name:</strong> {order.shippingAddress.fullName}
                    <br />
                    <strong>Address: </strong> {order.shippingAddress.address},
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message messsage='paid' variant='success'>
                      Delivered at {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not Delivered</Message>
                  )}
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h3>Payment</h3>
                  <p>
                    <strong>Method:</strong> {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>Paid at {order.paidAt}</Message>
                  ) : (
                    <Message variant='danger'>Not Paid</Message>
                  )}
                </div>
              </li>
              <li>
                <div className='card card-body'>
                  <h3>Order Items</h3>
                  <ul>
                    {order.orderItems.map((item) => (
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
                            {item.qty} x ${item.price} = $
                            {item.qty * item.price}
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
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Shipping</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className='row'>
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
                {!order.isPaid && (
                  <li>
                    {!sdkReady ? (
                      <Loading />
                    ) : (
                      <>
                        {errorPay && (
                          <Message variant='danger'>{errorPay}</Message>
                        )}
                        {loadingPay && <Loading />}

                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </>
                    )}
                  </li>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <li>
                    {loadingDeliver && <Loading />}
                    {errorDeliver && (
                      <Message variant='danger'>{errorDeliver}</Message>
                    )}
                    <button
                      type='button'
                      className='primary block'
                      onClick={deliverHandler}
                    >
                      Deliver Order
                    </button>
                  </li>
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
  margin: 6em 0;
  .card {
    border: 0.1rem #c0c0c0 solid;
    background-color: #f8f8f8;
    border-radius: 0.5rem;
    margin: 1rem;
  }
  .card-body {
    padding: 1rem;
  }
  .card-body > * {
    margin-bottom: 0.5rem;
  }
  .price {
    font-size: 2rem;
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
