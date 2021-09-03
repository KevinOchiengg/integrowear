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
          <h3 className='title'>Payment Method</h3>

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
            <button type='submit' className='btn primary'>
              Continue
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 1rem 0;
  .form {
    width: 100%;
  }
  .form,
  .primary,
  .payment-method-container {
    margin: 0 auto;
  }
  .payment-method-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    width: 30%;
    margin: 1em 0;
  }

  input {
    height: 1.5em;
  }

  .title {
    margin: 2em 0;
  }

  .checkbox-container {
    align-items: center;
    flex-direction: row;
  }

  .primary {
    color: var(--clr-blue);
    font-size: 1rem;
  }

  @media screen and (min-width: 800px) {
    .form {
      width: 60%;
    }

    .checkbox {
      height: 1.5em;
      width: 1.5em;
    }
  }
`
