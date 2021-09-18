import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Rating from './Rating'

const OfferSection = () => {
  return (
    <Wrapper className='offer-area'>
      <div className='row section-center'>
        <div className='offer-img'>
          <img src='images/hood5.png' alt='offer' />
        </div>

        <div className='offer-details'>
          <div className='product-info'>
            <h3>Hoodies Graphic Pull-over</h3>
            <Rating />
            <div className='price-box'>
              <span className='new-price'>$70.00</span>
              <span className='old-price'>$78.00</span>
            </div>

            <div className='timer'>
              <div
                className='countdown-deals'
                data-countdown='2020/03/01'
              ></div>
            </div>

            <p className='mt-30'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              fringilla augue nec est tristique auctor. Donec non est at libero
              vulputate rutrum. Morbi ornare lectus quis justo gravida semper.
              Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id
              nulla.
            </p>
            <Link to={`/cart`} className='btn'>
              add to cart
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.article`
  margin-bottom: 8rem;
  color: var(--clr-blue);

  .row {
    display: flex;
    flex-wrap: wrap;
    grid-gap: 4rem;
    align-items: center;
    justify-content: center;
  }

  .offer-img {
    width: 100%;
  }
  .offer-details {
    width: 100%;
  }
  p {
    color: var(--clr-dark-grey);
    font-size: 2rem;
    margin-top: 2rem;
    line-height: 1.5;
    letter-spacing: var(--spacing);
  }
  h3 {
    font-size: 3.5rem;
    margin-bottom: 2rem;
  }

  .new-price {
    color: var(--clr-blue);
    font-weight: 400;
    margin-right: 10px;
  }

  .price-box {
    font-size: 2rem;
    margin-top: 2rem;
  }
  .old-price {
    text-decoration: line-through;
    color: var(--clr-light-grey);
  }

  @media only screen and (min-width: 800px) {
    .offer-details {
      width: 50%;
    }
    .offer-img {
      width: 40%;
    }
  }
`

export default OfferSection
