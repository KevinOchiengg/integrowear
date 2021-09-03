import React, { useEffect } from 'react'
import styled from 'styled-components'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'
import Loading from '../components/Loading'
import Filters from '../components/Filters'
import Sort from '../components/Sort'
import GridView from '../components/GridView'
import ListView from '../components/ListView'
import Pagination from '../components/Pagination'
import ProductList from '../components/ProductList'

const ProductsPage = (props) => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList
  const productCategoryList = useSelector((state) => state.productCategoryList)

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])

  // const productSectionView = () => {
  //   if (loading) return <Loading />
  //   else if (error)
  //     return <Message variant='danger'>Oops! Error fetching Products</Message>
  //   else if (products.length === 0) return <Message>No Product Found</Message>
  //   else if (viewproducts) return
  //   else return
  // }

  return (
    <Wrapper className='section'>
      <div className='section-center'>
        <div className='products-category-container'>
          <div className='products-list-section'>
            <Sort />

            <Pagination />
          </div>
          <Filters />
        </div>
      </div>
    </Wrapper>
  )
}

export default ProductsPage

const Wrapper = styled.section`
  margin-top: 4em;
  padding: 4em 0;
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

  .sidebar-tag li {
    padding: 5px;
    border: 1px solid var(--clr-light-grey);
    border-radius: 2px;
  }

  .active {
    transition: var(--transition);
    color: var(--clr-yellow);
  }

  .product-rating,
  .product-stock-status,
  .add-to-cart-btn {
    margin: 1em 0;
  }
  .products-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
    gap: 1.5rem;
  }

  .page-btn {
    margin-top: 6em;
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
  }

  .page-btn span:hover {
    background: var(--clr-hover);
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
    grid-gap: 1em;
    margin: 0 1em;
  }

  .product-layout-list .rating {
    margin: 1em 0;
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
    padding: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }
  .sidebar-tag {
    display: flex;
    grid-gap: 1em;
    flex-wrap: wrap;
  }
  select {
    font-size: 10px;
    color: var(--clr-dark-grey);
  }

  .product-layout-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2em 0;
    padding: 0.6em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  }

  .product-content-list {
    margin: 1em 0;
  }

  .product-action-area {
    width: 100%;
  }
  .add-to-cart-btn-container {
    margin-top: 0.5em;
  }

  .product-content-list h4 a {
    font-size: 1rem;
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

    .product-layout-list .price-box {
      font-size: 1rem;
    }

    .new-price {
      color: var(--clr-yellow);
      font-weight: 400;
      margin-right: 10px;
    }
    .old-price {
      text-decoration: line-through;
      color: var(--clr-light-grey);
    }
    h4 {
      margin-bottom: 0.4em;
    }
    .product-content-list h4 a {
      font-size: 1.2rem;
    }
    .product-action-area {
      width: 23%;
      height: 180px;
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
      width: 72%;
    }
    .products-category-nav {
      width: 25%;
    }

    select {
      font-size: 15px;
    }

    .sort-by {
      width: 50%;
      display: block;
    }

    .product-category-title {
      font-size: 1rem;
      border-bottom: 1px solid var(--clr-light-grey);
      margin-bottom: 2em;
      padding-bottom: 1em;
    }
  }
`
