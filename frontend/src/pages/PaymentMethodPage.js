import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

export default function PaymentMethodPage(props) {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart
  if (!shippingAddress.address) {
    props.history.push('/shipping')
  }
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
    props.history.push('/placeorder')
  }
  return (
    <Wrapper>
      <div className='section-center'>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className='form' onSubmit={submitHandler}>
          <h3 className='sub-heading'>payment</h3>
          <h1 className='heading'>payment method</h1>

          <div className='payment-method-container'>
            <input
              type='radio'
              id='paypal'
              value='PayPal'
              name='paymentMethod'
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='paypal'>PayPal</label>
          </div>

          <div className='payment-method-container'>
            <input
              type='radio'
              id='stripe'
              value='Stripe'
              name='paymentMethod'
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor='stripe'>Stripe</label>
          </div>
          <div>
            <button type='submit' className='btn'>
              Continue
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem 0;

  .sub-heading {
    margin-top: 4rem;
  }
  .form,
  .btn,
  .payment-method-container {
    margin: 0 auto;
  }
  .payment-method-container {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 30%;
    margin: 2rem auto;
  }

  input {
    height: 2.2rem;
  }

  .btn {
    font-size: 2rem;
  }

  #stripe {
    margin-right: 1.2rem;
  }

  @media screen and (min-width: 800px) {
    .checkbox {
      height: 1.5em;
      width: 1.5em;
    }
  }
`
