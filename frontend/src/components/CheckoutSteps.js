import React from 'react'
import styled from 'styled-components'

export default function CheckoutSteps(props) {
  return (
    <Wrapper>
      <div className='row checkout-steps'>
        <div className={props.step1 ? 'active' : ''}>Sign-In</div>
        <div className={props.step2 ? 'active' : ''}>Shipping</div>
        <div className={props.step3 ? 'active' : ''}>Payment</div>
        <div className={props.step4 ? 'active' : ''}>Place Order</div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .row {
    display: flex;
  }
  .checkout-steps > div {
    border-top: 0.2em var(--clr-light-grey) solid;
    color: var(--clr-light-grey);
    flex: 1;
    padding: 0.6em;
  }
  .checkout-steps > div.active {
    border-top-color: var(--clr-yellow);
    color: var(--clr-yellow);
  }
`
