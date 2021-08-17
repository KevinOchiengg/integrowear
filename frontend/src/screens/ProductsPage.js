import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import mixture from '../images/mixture.png'
import { FaAlignRight, FaTh, FaThList } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import ProductLayoutList from '../components/ProductLayoutList'
import Product from '../components/Product'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

const ProductsPage = () => {
  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts({}))
  }, [dispatch])
  return (
    <Wrapper className='section'>
      <div className='section-center'>
        <div className='products-category-container'>
          <div className='products-list-section'>
            <div className='products-list-header'>
              <ul className='nav shop-item-filter-list'>
                <li className='active'>
                  <Link className='active grid-view'>
                    <FaTh />
                  </Link>
                </li>
                <li>
                  <Link className='list-view'>
                    <FaThList />
                  </Link>
                </li>
              </ul>

              <div className='product-relevance'>
                <p className='sort-by'>Sort By :</p>
                <select className='nice-select' name='sortby'>
                  <option value='trending'>Relevance</option>
                  <option value='sales'>Name(A - Z)</option>
                  <option value='sales'>Name(Z - A)</option>
                  <option value='rating'>Price(Low) High)</option>
                  <option value='date'>Rating(Lowest)</option>
                </select>
              </div>
            </div>

            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant='danger'>
                Oops! Error fetching Products
              </MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox>No Product Found</MessageBox>
                )}
                <div className='products-list'>
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </>
            )}

            <ProductLayoutList />
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
              <ul>
                <li className='has-sub'>
                  <Link to='#'>Sports Watches</Link>
                  <ul>
                    <li>
                      <Link to='#'>Watch men (3)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Kitchen & Dining</Link>
                  <ul>
                    <li>
                      <Link to='#'>Watch Woman (2)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Casual Watches (12)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Watch Bag (4)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Dress Watches (8)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Digital Watches</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Kitchen & Dining (11)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Digital (8)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Digital Watches (12)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Digital Man (8)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>Crystal Watches (7)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Fusion Watch (8)</Link>
                    </li>
                  </ul>
                </li>
                <li className='has-sub'>
                  <Link to='#'>watch series (0)</Link>
                </li>
                <li className='has-sub'>
                  <Link to='#'>watch tnt (11)</Link>
                  <ul>
                    <li>
                      <Link to='#'>Sports (8)</Link>
                    </li>
                  </ul>
                </li>
              </ul>
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
                      <div className='input-type'>
                        <input type='text' id='min-price' />
                      </div>
                      <span>—</span>
                      <div className='input-type'>
                        <input type='text' id='max-price' />
                      </div>
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