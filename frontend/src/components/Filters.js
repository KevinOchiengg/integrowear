import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { listProducts } from '../actions/productActions'
import Loading from '../components/Loading'
import Message from '../components/Message'
import Rating from '../components/Rating'
import { prices, ratings } from '../utils'

const Filters = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)

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
      <div className='products-category-nav'>
        <h4 className='product-category-title'>Product categories</h4>

        <div className='category-sub-menu'>
          {loadingCategories ? (
            <Loading />
          ) : errorCategories ? (
            <Message variant='danger'>{errorCategories}</Message>
          ) : (
            <ul>
              <li className='has-sub'>
                <Link
                  className={'all' === category ? 'active has-sub' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c} className='has-sub'>
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
        <div className='shop-sidebar'>
          <h4 className='product-category-title'>Filter By Price</h4>

          <div className='filter-price-content'>
            <form action='#' method='post'>
              <div id='price-slider' className='price-slider'></div>
              <div className='filter-price-wrapper'>
                <span>FILTER</span>

                <div className='filter-price-cont'>
                  <span>Price:</span>
                  <ul>
                    {prices.map((p) => (
                      <li key={p.name}>
                        <Link
                          to={getFilterUrl({ min: p.min, max: p.max })}
                          className={
                            `${p.min}-${p.max}` === `${min}-${max}`
                              ? 'active'
                              : ''
                          }
                        >
                          {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <span>Avg. Customer Review</span>
                  <ul>
                    {ratings.map((r) => (
                      <li key={r.name}>
                        <Link
                          to={getFilterUrl({ rating: r.rating })}
                          className={
                            `${r.rating}` === `${rating}` ? 'active' : ''
                          }
                        >
                          <Rating caption={' & up'} rating={r.rating}></Rating>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className='shop-sidebar'>
          <h4 className='product-category-title'>Product tags</h4>

          <ul className='sidebar-tag'>
            <li>
              <Link to='#'>accesories</Link>
            </li>

            <li>
              <Link to='#'>blouse</Link>
            </li>
            <li>
              <Link to='#'>clothes</Link>
            </li>
            <li>
              <Link to='#'>desktop</Link>
            </li>
            <li>
              <Link to='#'>digital</Link>
            </li>
            <li>
              <Link to='#'>fashion</Link>
            </li>
            <li>
              <Link to='#'>women</Link>
            </li>
            <li>
              <Link to='#'>men</Link>
            </li>
            <li>
              <Link to='#'>laptop</Link>
            </li>
            <li>
              <Link to='#'>handbag</Link>
            </li>
          </ul>
        </div>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section``

export default Filters
