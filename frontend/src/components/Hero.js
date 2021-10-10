import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Hero = () => {
  return (
    <Wrapper className='hero'>
      <div className='section__center'>
        <div className='hero__container'>
          <h3>
            Welcome To <span>Integro</span> <br />
            Wears<span>.</span>
          </h3>
          <p>
            Switch Your Swag Mode On & Dress like you <br />
            already famous
          </p>
          <div>
            <Link to='/products' className='btn'>
              Shop Now &#8594;
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Hero

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 8rem;
  font-family: 'Playfair Display', serif;
  width: 100%;
  height: 90vh;
  background: linear-gradient(
      0deg,
      rgba(39, 55, 85, 0.7),
      rgba(39, 55, 85, 0.7)
    ),
    url(../../images/background/hero.jpg);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  .section__center {
    max-width: var(--max-width);
    padding: 0 1.4rem;
    height: 100%;
    width: 100%;
  }
  br {
    display: none;
  }
  .container {
    max-width: var(--max-width);
    margin: auto;
    padding: 0 1.4em;
  }

  .btn {
    padding: 1rem 3.5rem;
    margin-top: 2rem;
    font-size: 2rem;
  }
  .hero__container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  span {
    color: var(--clr-yellow);
  }

  h3 {
    font-size: 5rem;
    line-height: 1.2em;
    margin: 1em 0 0 0;
    color: var(--clr-light-yellow);
  }

  p {
    font-size: 2.2rem;
    padding: 0.5rem 0;
    line-height: 1.5;
    color: var(--clr-light-yellow);
    letter-spacing: var(--spacing);
  }

  @media (min-width: 768px) {
    .menu-icon {
      display: block;
      cursor: pointer;
    }

    h3 {
      font-size: 8rem;
    }

    p {
      line-height: 1.5em;
      color: var(--clr-light-yellow);
    }
    br {
      display: block;
    }
  }
`
