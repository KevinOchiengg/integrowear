import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { prices, ratings } from '../utils/prices'

const Filters = () => {
  const dispatch = useDispatch()

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams()

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
      <h4>Product categories</h4>

      <div className='category-sub-menu'>
        {loadingCategories ? (
          <Loading />
        ) : errorCategories ? (
          <Message
            variant='danger'
            massage='Error loading product categories'
            name='hide'
          />
        ) : (
          <ul className='sidebar-tag'>
            <li>
              <Link
                className={'all' === category ? 'active has-sub' : ''}
                to={getFilterUrl({ category: 'all' })}
              >
                Any
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={c === category ? 'active' : ''}
                  to={getFilterUrl({ category: c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='filter-by-price-container'>
        <h4>Filter by price</h4>

        <ul>
          {prices.map((p) => (
            <li key={p.name}>
              <Link
                to={getFilterUrl({ min: p.min, max: p.max })}
                className={
                  `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                }
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className='filter-by-review-container'>
        <h4>Customer review</h4>
        <ul>
          {ratings.map((r) => (
            <li key={r.name}>
              <Link
                to={getFilterUrl({ rating: r.rating })}
                className={`${r.rating}` === `${rating}` ? 'active' : ''}
              >
                <Rating caption={' & up'} rating={r.rating} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  padding: 1rem;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);

  @media (min-width: 769px) {
    width: 20%;
  }

  .filter-by-price-container,
  .sidebar-tag {
    margin: 3rem 0;
  }

  .active {
    color: var(--clr-yellow);
  }
  .product-tags-container {
    margin-top: 2.5rem;
  }

  .sidebar-tag li {
    padding: 5px;
    border: 1px solid var(--clr-light-grey);
    border-radius: 2px;
  }

  .filter-by-review-container li,
  .filter-by-price-container li {
    margin: 1.5rem 0;
  }
  .sidebar-tag {
    display: flex;
    grid-gap: 1rem;
    flex-wrap: wrap;
  }
`

export default Filters
