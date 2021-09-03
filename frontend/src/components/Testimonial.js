import React, { useState, useEffect } from 'react'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import { FaQuoteRight } from 'react-icons/fa'
import data from './TestimonialData'
import styled from 'styled-components'

function Testimonial() {
  const [people] = useState(data)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const lastIndex = people.length - 1
    if (index < 0) {
      setIndex(lastIndex)
    }
    if (index > lastIndex) {
      setIndex(0)
    }
  }, [index, people])

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1)
    }, 3000)
    return () => clearInterval(slider)
  }, [index])

  return (
    <Wrapper>
      <h3 className='sub-heading'>customer's review</h3>
      <h1 className='heading'>what they say</h1>
      <div className='section-center'>
        {people.map((person, personIndex) => {
          const { id, image, name, title, quote } = person

          let position = 'nextSlide'
          if (personIndex === index) {
            position = 'activeSlide'
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = 'lastSlide'
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className='person-img' />
              <h4>{name}</h4>
              <p className='profesion'>{title}</p>
              <p className='text'>{quote}</p>
              <FaQuoteRight className='icon' />
            </article>
          )
        })}

        <button className='prev' onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>

        <button className='next' onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </Wrapper>
  )
}

export default Testimonial

const Wrapper = styled.section`
  width: 100%;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }

  .section-center {
    margin: 0 auto;
    /* have to have a height */
    height: 500px;
    max-width: var(--max-width);
    text-align: center;
    position: relative;
    display: flex;
    overflow: hidden;
  }
  .person-img {
    border-radius: 50%;
    margin-bottom: 1em;
    margin: 1em auto;
    width: 150px;
    height: 150px;
    object-fit: cover;
    border: 4px solid var(--clr-yellow);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
  }
  h4 {
    text-transform: uppercase;
    color: var(--clr-blue);
    margin-bottom: 0.25em;
  }
  .profesion {
    text-transform: capitalize;
    margin-bottom: 0.75em;
    color: var(--clr-yellow);
  }
  .text {
    margin: 0 auto;
    margin-top: 2em;
    line-height: 2;
    color: var(--clr-blue);
    letter-spacing: var(--spacing);
  }
  .icon {
    font-size: 3rem;
    margin-top: 1rem;
    color: var(--clr-yellow);
  }
  .prev,
  .next {
    position: absolute;
    top: 200px;
    transform: translateY(-50%);
    background: var(--clr-yellow);
    color: var(--clr-blue);
    display: grid;
    place-items: center;
    border-color: transparent;
    font-size: 2.7rem;
    border-radius: 0.25em;
    cursor: pointer;
    transition: var(--transition);
  }
  .prev:hover,
  .next:hover {
    background: var(--clr-hover);
  }
  .prev {
    left: 0;
  }
  .next {
    right: 0;
  }
  article {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: var(--transition);
  }
  article.activeSlide {
    opacity: 1;
    transform: translateX(0);
  }
  article.lastSlide {
    transform: translateX(-100%);
  }
  h4 {
    font-size: 2rem;
  }
  p {
    font-size: 1.8rem;
  }
  article.nextSlide {
    transform: translateX(100%);
  }
  @media (min-width: 675px) {
    .text {
      max-width: 60%;
    }
    .prev,
    .next {
      font-size: 3rem;
    }
  }
`
