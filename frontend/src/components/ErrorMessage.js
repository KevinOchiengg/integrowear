import React from 'react';
import styled from 'styled-components';

const ErrorMessage = (props) => {
  return (
    <Wrapper className={`alert alert-${props.variant || 'info'}`}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default ErrorMessage;
