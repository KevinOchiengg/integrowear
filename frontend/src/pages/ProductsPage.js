import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FaTh, FaThList } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import Product from '../components/Product'
import Message from '../components/Message'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'
import Rating from '../components/Rating'
import { prices, ratings } from '../utils'
import Loading from '../components/Loading'

const ProductsPage = (props) => {
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

  const productSectionView = () => {
    if (loading) return <Loading />
    else if (error)
      return <Message variant='danger'>Oops! Error fetching Products</Message>
    else if (products.length === 0) return <Message>No Product Found</Message>
    else if (viewproducts)
      return (
        <div className='products-list'>
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )
    else
      return (
        <>
          {products.map((product) => (
            <div className='product-layout-list'>
              <div className='product-image'>
                <Link to={`/product/${product._id}`}>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>

              <div className='product-content-list'>
                <h4>
                  <Link to={`/product/${product._id}`} className='product-name'>
                    {product.name}
                  </Link>
                </h4>
                <div className='price-box'>
                  <span className='new-price'>Ksh {product.price}</span>
                  <span className='old-price'>ksh 2,000</span>
                </div>

                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />

                <p>{product.description}</p>
              </div>

              <div className='product-action-area'>
                <ul className='stock-cont'>
                  <li className='product-sku'>
                    Sku: <span>P006</span>
                  </li>
                  <li className='product-stock-status'>
                    Availability:
                    {product.countInStock > 0 ? (
                      <span className='in-stock'>In Stock</span>
                    ) : (
                      <span className='in-stock'>Out of stock</span>
                    )}
                  </li>
                </ul>
                <div className='product-button'>
                  <ul className='actions'>
                    <li className='add-to-wishlist'>
                      <Link to='/' className='add_to_wishlist'>
                        <AiOutlineHeart /> Add to Wishlist
                      </Link>
                    </li>
                  </ul>
                  <div className='add-to-cart-btn-container'>
                    <button className='btn add-to-cart-btn'>Add to cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )
  }

  return (
    <Wrapper className='section'>
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
            {productSectionView()}
            <div className='page-btn'>
              <span>1</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
              <span>&#8594;</span>
            </div>
          </div>
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
                              <Rating
                                caption={' & up'}
                                rating={r.rating}
                              ></Rating>
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
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    grid-gap: 2em;
    margin: 2em 0;
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
