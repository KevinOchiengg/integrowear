import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FaTh, FaThList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'

const Sort = (props) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const [viewproducts, setViewProduct] = useState(true)

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams()

  const { loading, error, products, page, pages } = productList

  const productCategoryList = useSelector((state) => state.productCategoryList)
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList
  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
      })
    )
  }, [category, dispatch, max, min, name, order, rating, pageNumber])

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber
    const filterCategory = filter.category || category
    const filterName = filter.name || name
    const filterRating = filter.rating || rating
    const sortOrder = filter.order || order
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`
  }

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  return (
    <Wrapper>
      <div className='products-list-header'>
        <ul className='nav shop-item-filter-list'>
          <li className={`${viewproducts ? 'active grid-view' : 'grid-view'}`}>
            <FaTh
              onClick={(e) => {
                setViewProduct(true)
              }}
            />
          </li>
          <li className={`${!viewproducts ? 'active grid-view' : 'grid-view'}`}>
            <FaThList
              onClick={(e) => {
                setViewProduct(false)
              }}
            />
          </li>
        </ul>

        <div className='product-relevance'>
          <p className='sort-by'>Sort By :</p>
          <select
            className='nice-select'
            value={order}
            onChange={(e) => {
              props.history.push(getFilterUrl({ order: e.target.value }))
            }}
          >
            <option value='newest'>Newest Arrivals</option>
            <option value='lowest'>Price: Low to High</option>
            <option value='highest'>Price: High to Low</option>
            <option value='toprated'>Avg. Customer Reviews</option>
          </select>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
`

export default Sort
