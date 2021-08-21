import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import styled from 'styled-components'

export default function Loading() {
  return (
    <Wrapper>
      <div className='loading-container'>
        <VscLoading />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
  .loading-container {
    animation: spinner 1s linear infinite;
  }

  .loading-container svg {
    color: var(--clr-dark-grey);
    font-size: 3rem;
  }
`
