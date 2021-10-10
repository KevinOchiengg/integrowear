import React, { useState } from 'react'
import { ImSearch } from 'react-icons/im'
import styled from 'styled-components'

const SearchBar = (props) => {
  const [name, setName] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    props.history.push(`/search/name/${name}`)
  }

  return (
    <Wrapper>
      <form onSubmit={submitHandler}>
        <input
          type='search'
          name='q'
          id='q'
          placeholder='Search for products...'
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>
          <ImSearch />
        </button>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  form {
    display: flex;
  }

  button {
    outline: none;
    border: none;
    background: var(--clr-yellow);
    border-radius: 0;
    color: var(--clr-blue);
    padding: 0 1.2rem;
  }

  svg {
    font-size: 2.2rem;
  }

  input {
    border-radius: 0;
    height: 3em;
    background: var(--clr-white);
    color: var(--clr-blue);
    outline: none;
    border: none;
    padding: 1em;
    letter-spacing: var(--spacing);
  }
`
export default SearchBar
