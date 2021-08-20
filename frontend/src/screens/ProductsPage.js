import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { FaTh, FaThList } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import Product from '../components/Product'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import { useState } from 'react'
import Rating from '../components/Rating'
import { prices, ratings } from '../utils'

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
    if (loading) return <LoadingBox></LoadingBox>
    else if (error)
      return (
        <MessageBox variant='danger'>Oops! Error fetching Products</MessageBox>
      )
    else if (products.length === 0)
      return <MessageBox>No Product Found</MessageBox>
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
                <Link to='product-details.html'>
                  <img src={product.image} alt={product.name} />
                </Link>
              </div>

              <div className='product-content-list'>
                <h4>
                  <Link to='/productDetails' className='product-name'>
                    {product.name}
                  </Link>
                </h4>
                <div className='price-box'>
                  <span className='new-price'>Ksh {product.price}</span>
                  <span className='old-price'>ksh 2,000</span>
                </div>

                <div className='product-rating'>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                </div>

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
                <li className='active'>
                  <Link className='active grid-view'>
                    <FaTh
                      onClick={(e) => {
                        setViewProduct(true)
                      }}
                    />
                  </Link>
                </li>
                <li>
                  <Link className='list-view'>
                    <FaThList
                      onClick={(e) => {
                        setViewProduct(false)
                      }}
                    />
                  </Link>
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
                <LoadingBox></LoadingBox>
              ) : errorCategories ? (
                <MessageBox variant='danger'>{errorCategories}</MessageBox>
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
                    <li key={c}>
                      <Link
                        className={c === category ? 'active has-sub' : ''}
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
                    <Link className='add-to-cart-button'>
                      <span>FILTER</span>
                    </Link>
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
  .has-sub ul li {
    margin: 1em 0;
  }
  .single-product-area {
    position: relative;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
    margin: 2em 0;
    border-radius: 5px;
  }
  .product-thumb {
    position: relative;
  }
  .sort-by {
    display: none;
  }
  .product-thumb a {
    display: block;
  }
  .product-thumb a img {
    border-radius: 5px;
  }
  .product-thumb .action-links {
    position: absolute;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
  .sidebar-tag li {
    padding: 5px;
    border: 1px solid var(--clr-light-grey);
    border-radius: 2px;
  }
  .action-links a {
    background-color: var(--clr-white);
    border-radius: 100%;
    color: var(--clr-blue);
    display: inline-block;
    font-weight: normal;
    height: 43px;
    line-height: 43px;
    text-align: center;
    vertical-align: top;
    width: 43px;
    transition: var(--transition);
    margin: 0 5px;
    &:hover {
      background-color: var(--clr-yellow);
      color: var(--clr-blue);
    }
    opacity: 0;
    transform: scale(0.8) rotate(-45deg);
  }

  .product-rating,
  .product-stock-status,
  .add-to-cart-btn {
    margin: 1em 0;
  }

  .add_to_wishlist {
    display: flex;
    align-items: center;
    grid-gap: 0.7em;
  }
  .single-product-area:hover .action-links a {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
  .page-btn {
    margin: 0 auto 80px;
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

  .label-product {
    background: var(--clr-yellow);
    color: var(--clr-blue);
    font-size: 0.8em;
    font-weight: 500;
    position: absolute;
    border-radius: 3px;
    left: 13px;
    text-align: center;
    text-transform: capitalize;
    top: 13px;
    padding: 0.2em;
  }

  .product-caption {
    text-align: center;
    padding: 20px 0;
    border-top: 1px solid var(--clr-light-grey);
  }
  .product-name {
    display: block;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0;
    text-transform: capitalize;
  }
  .new-price {
    color: var(--clr-yellow);
    font-weight: 400;
    margin-right: 10px;
  }
  .old-price {
    font-size: 15px;
    text-decoration: line-through;
    color: #555;
    padding-left: 5px;
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

  svg {
    font-size: 1.25rem;
    &:hover {
      color: var(--clr-hover);
      transition: var(--transition);
    }
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
  @media (min-width: 800px) {
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
    .single-product-area {
      margin: 0;
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

    .products-list {
      display: flex;
      grid-gap: 2em;
      margin: 2em 0;
    }
  }
`
