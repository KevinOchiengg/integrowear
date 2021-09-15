import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import styled from 'styled-components'

export default function Loading() {
  return (
    <Wrapper className='loading-container'>
      <VscLoading />
    </Wrapper>
  )
}

const Wrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: var(--clr-blue);
    font-size: 5rem;
    animation: spinner 1s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`
