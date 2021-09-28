import React from 'react'
import styled from 'styled-components'

const BrandSection = () => {
  return (
    <Wrapper>
      <div className='row section-center'>
        <div className='brand-single-item'>
          <img src='images/brands/dior.png' alt='dior' />
        </div>
        <div className='brand-single-item'>
          <img src='images/brands/lui.png' alt='lui' />
        </div>
        <div className='brand-single-item'>
          <img src='images/brands/gucci.png' alt='gucci' />
        </div>

        <div className='brand-single-item'>
          <img src='images/brands/nike.png' alt='nike' />
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
    justify-content: space-between;
    grid-gap: 1rem;
  }

  img {
    filter: grayscale(100%);
    width: 8rem;
  }

  @media only screen and (min-width: 800px) {
    img {
      width: 12rem;
    }

    .row {
      justify-content: space-between;
    }
  }
`
export default BrandSection
