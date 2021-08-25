import React from 'react'
import styled from 'styled-components'

const ErrorMessage = (props) => {
  return (
    <Wrapper className='alert'>
      <div className='section-center'>
        <h4 className={props.variant}>{props.message}</h4>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .alert {
    text-align: center;
  }
`

export default ErrorMessage
