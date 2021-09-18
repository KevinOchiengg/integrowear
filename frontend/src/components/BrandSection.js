import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const BrandSection = () => {
  return (
    <Wrapper className='our-brand-area section-pb'>
      <div className='row section-center'>
        <div className='brand-single-item'>
          <Link to='#'>
            <img src='images/brands/dior.png' alt='' />
          </Link>
        </div>
        <div className='brand-single-item'>
          <Link to='#'>
            <img src='images/brands/lui.png' alt='' />
          </Link>
        </div>
        <div className='brand-single-item'>
          <Link to='#'>
            <img src='images/brands/gucci.png' alt='' />
          </Link>
        </div>

        <div className='brand-single-item'>
          <Link to='#'>
            <img src='images/brands/nike.png' alt='' />
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 8rem;

  .row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    grid-gap: 1rem;
  }

  img {
    width: 10rem;
  }

  @media only screen and (min-width: 800px) {
    img {
      width: 18rem;
    }

    .row {
      justify-content: space-between;
    }
  }
`
export default BrandSection
