import React from 'react'
import { FaStar, FaStarHalf } from 'react-icons/fa'
import styled from 'styled-components'

export default function Rating(props) {
  const { rating, numReviews, caption } = props
  return (
    <Wrapper>
      <div className='rating'>
        {rating >= 1 ? (
          <i>{<FaStar />}</i>
        ) : rating >= 0.5 ? (
          <i>{<FaStar />}</i>
        ) : (
          <i>{<FaStarHalf />}</i>
        )}
        {rating >= 2 ? (
          <i>{<FaStar />}</i>
        ) : rating >= 1.5 ? (
          <i>{<FaStar />}</i>
        ) : (
          <i>{<FaStarHalf />}</i>
        )}
        {rating >= 3 ? (
          <i>{<FaStar />}</i>
        ) : rating >= 2.5 ? (
          <i>{<FaStar />}</i>
        ) : (
          <i>{<FaStarHalf />}</i>
        )}
        {rating >= 4 ? (
          <i>{<FaStar />}</i>
        ) : rating >= 3.5 ? (
          <i>{<FaStar />}</i>
        ) : (
          <i>{<FaStarHalf />}</i>
        )}
        {rating >= 5 ? (
          <i>{<FaStar />}</i>
        ) : rating >= 4.5 ? (
          <i>{<FaStar />}</i>
        ) : (
          <i>{<FaStarHalf />}</i>
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
  .rating {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    color: var(--clr-yellow);
    width: 0.8em;
  }
`
