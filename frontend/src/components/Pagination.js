import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'

const Pagination = () => {
  const productList = useSelector((state) => state.productList)
  const { page, pages } = productList
  return (
    <Wrapper>
      <div className='page-btn'>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1} to={`/productlist/pageNumber/${x + 1}`}>
            <span className={x + 1 === page ? 'active' : ''}>{x + 1}</span>
          </Link>
        ))}
        <span>&#8594;</span>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .page-btn {
    margin: 20px auto 80px;
  }

  a {
    color: var(--clr-blue);
  }

  .page-btn span {
    display: inline-block;
    border: 1px solid var(--clr-blue);
    margin: 5px;
    width: 40px;
    height: 40px;
    text-align: center;
    cursor: pointer;
    line-height: 40px;
    color: var(--clr-blue);
    transition: var(--transition);
    font-size: 1.7rem;
  }

  .page-btn span:hover {
    background: var(--clr-hover);
  }
  .page-btn .active {
    background: var(--clr-yellow);
  }
`

export default Pagination
