import React from 'react';
import styled from 'styled-components';

export default function LoadingBox() {
  return (
    <Wrapper className='loading'>
      <i className='fa fa-spinner fa-spin'></i>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .loading {
    width: 4em;
    height: 4em;
    margin: 0 auto;
    margin-top: 5em;
    border-radius: 50%;
    border: 4px solid var(--clr-light-grey);
    border-top-color: var(--clr-primary-5);
    animation: spinner 0.6s linear infinite;
  }
`;
