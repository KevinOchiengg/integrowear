import React, { useEffect } from 'react'
import styled from 'styled-components'

import { FaTh, FaThList } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'
import Filters from '../components/Filters'
import GridView from '../components/GridView'
import ListView from '../components/ListView'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'

const ProductsPage = (props) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { products, page, pages } = productList
  const productCategoryList = useSelector((state) => state.productCategoryList)
  const [viewproducts, setViewProduct] = useState(true)
  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams()

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
      <div className='section-center'>
        <div className='products-category-container'>
          <div className='products-list-section'>
            <div className='products-list-header'>
              <ul className='nav shop-item-filter-list'>
                <li
                  className={`${
                    viewproducts ? 'active grid-view' : 'grid-view'
                  }`}
                >
                  <FaTh
                    onClick={(e) => {
                      setViewProduct(true)
                    }}
                  />
                </li>
                <li
                  className={`${
                    !viewproducts ? 'active grid-view' : 'grid-view'
                  }`}
                >
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
            {viewproducts ? <ListView /> : <GridView />}

            <div className='pagination'>
              {[...Array(pages).keys()].map((x) => (
                <Link key={x + 1} to={getFilterUrl({ page: x + 1 })}>
                  <span className={x + 1 === page ? 'active' : ''}>
                    {x + 1}
                  </span>
                </Link>
              ))}
              <span>&#8594;</span>
            </div>
          </div>
          <Filters />
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductsPage

const Wrapper = styled.section`
  margin: 8rem 0;
  padding: 4rem 0;
  font-size: 2rem;
  color: var(--clr-dark-grey);

  a {
    color: var(--clr-dark-grey);
  }

  .has-sub {
    margin: 1em 0;
  }

  .product-thumb {
    position: relative;
  }
  .sort-by {
    display: none;
  }

  .nav svg {
    cursor: pointer;
  }
  .sidebar-tag li {
    padding: 5px;
    border: 1px solid var(--clr-light-grey);
    border-radius: 2px;
  }

  .nav .active {
    transition: var(--transition);
    color: var(--clr-yellow);
  }

  .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;
  }

  .product-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0;
    text-transform: capitalize;
  }

  .products-list-header {
    display: flex;
    justify-content: space-between;
    height: 3em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  .nav,
  .product-relevance {
    display: flex;
    align-items: center;
    grid-gap: 1rem;
    margin: 0 1rem;
  }

  .product-layout-list .rating {
    margin: 1rem 0;
    justify-content: flex-start;
  }

  .buttons__container {
    margin-top: 15px;
  }
  .buttons__container .btn {
    margin: 0 10px;
  }
  .shop-sidebar {
    margin: 1.8em 0;
  }

  .products-category-nav {
    padding: 1rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  select {
    font-size: 10px;
    color: var(--clr-dark-grey);
  }

  .loading-container {
    margin-top: 10rem;
  }
  .product-layout-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    padding: 0.6rem;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  .product-content-list {
    margin: 1rem 0;
  }

  .product-action-area {
    width: 100%;
  }
  .add-to-cart-btn-container {
    margin-top: 0.5em;
  }

  @media (min-width: 800px) {
    .product-layout-list {
      flex-direction: row;
      justify-content: space-between;
    }
    .product-image {
      width: 20%;
      height: 180px;
    }
    .product-content-list {
      width: 50%;
      height: 180px;
    }

    .product-action-area {
      width: 23%;
    }
  }

  @media only screen and (min-width: 475px) {
    .btn:first-child {
      margin-bottom: 5px;
    }
  }
  @media (min-width: 769px) {
    .products-category-container {
      display: flex;
      flex-direction: row-reverse;
      justify-content: space-between;
    }
    .products-list-section {
      width: 78%;
    }

    select {
      font-size: 15px;
    }

    .sort-by {
      width: 50%;
      display: block;
    }
  }
`
