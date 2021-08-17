import React from 'react'
import styled from 'styled-components'

const AdSection = () => {
  return (
    <Wrapper className='ad-section'>
      <div className='section-center'>
        <a
          href='https://www.bluehost.com/track/kevin932/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <img
            border='0'
            src='https://bluehost-cdn.com/media/partner/images/kevin932/760x80/760x80BW.png'
            alt='Ad'
          />
        </a>
      </div>
    </Wrapper>
  )
}

export default AdSection

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 60px auto;

  @media screen and (max-width: 800px) {
    .ad-section img {
      padding: 0 30px;
      width: 360px;
    }
  }
`
