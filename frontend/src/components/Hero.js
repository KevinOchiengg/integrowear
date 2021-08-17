import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Hero = () => {
  return (
    <Wrapper className='hero'>
      <div className='section__center'>
        <div className='hero__container'>
          <h1>
            Welcome To <span>Integro</span> <br />
            Wears<span>.</span>
          </h1>
          <p>
            Switch Your Swag Mode On
            <br /> & Dress like you already famous
          </p>
          <div>
            <Link to='/products' className='btn hero-btn'>
              Explore Now &#8594;
            </Link>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Hero;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 4rem;
  font-family: 'Playfair Display', serif;
  width: 100%;
  height: 96vh;
  background: linear-gradient(
      0deg,
      rgba(39, 55, 85, 0.7),
      rgba(39, 55, 85, 0.7)
    ),
    url(../../images/hero.jpg);

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  .section__center {
    max-width: var(--max-width);
    padding: 0 1.4em;
    height: 100%;
    width: 100%;
  }

  .container {
    max-width: var(--max-width);
    margin: auto;
    padding: 0 1.4em;
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

  h1 {
    font-size: 4rem;
    line-height: 1.2em;
    margin: 1em 0 0.6em 0;
    color: var(--clr-light-yellow);
  }

  .hero-btn {
    font-size: 1.2rem;
    color: var(--clr-blue);
  }

  p {
    font-size: 1.2rem;
    line-height: 1.8em;
    color: var(--clr-light-yellow);
    letter-spacing: var(--spacing);
  }



  @media only screen and (max-width: 800px) {
    .menu-icon {
      display: block;
      cursor: pointer;
    }

    h1 {
      font-size: 3rem;
      line-height: 1.2em;
      margin: 1.2em 0;
      color: var(--clr-light-yellow);
    }

    .hero-btn {
      font-size: 1.2rem;
      
    }

    p {
    
      line-height: 1.5em;
      color: var(--clr-light-yellow);
      
    }

  }

  }
`;
