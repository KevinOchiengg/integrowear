import React from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import styled from 'styled-components'

export default function Rating(props) {
  const { rating, numReviews, caption } = props
  return (
    <Wrapper>
      <div className='rating'>
        {rating >= 1 ? (
          <i>{<BsStarFill />}</i>
        ) : rating >= 0.5 ? (
          <i>{<BsStarHalf />}</i>
        ) : (
          <i>{<BsStar />}</i>
        )}
        {rating >= 2 ? (
          <i>{<BsStarFill />}</i>
        ) : rating >= 1.5 ? (
          <i>{<BsStarHalf />}</i>
        ) : (
          <i>{<BsStar />}</i>
        )}
        {rating >= 3 ? (
          <i>{<BsStarFill />}</i>
        ) : rating >= 2.5 ? (
          <i>{<BsStarHalf />}</i>
        ) : (
          <i>{<BsStar />}</i>
        )}
        {rating >= 4 ? (
          <i>{<BsStarFill />}</i>
        ) : rating >= 3.5 ? (
          <i>{<BsStarHalf />}</i>
        ) : (
          <i>{<BsStar />}</i>
        )}
        {rating >= 5 ? (
          <i>{<BsStarFill />}</i>
        ) : rating >= 4.5 ? (
          <i>{<BsStarHalf />}</i>
        ) : (
          <i>{<BsStar />}</i>
        )}
        {caption ? (
          <span>{caption}</span>
        ) : (
          <span>({numReviews + ' reviews'})</span>
        )}
      </div>
    </Wrapper>
  )
}
const Wrapper = styled.section`
  color: var(--clr-blue);
  .rating {
    display: flex;
    align-items: center;
    font-size: 1.7rem;
  }

  i:not(:first-child) {
    margin: 0 0.1rem;
  }

  svg {
    color: var(--clr-yellow);
  }
`
