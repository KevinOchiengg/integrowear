import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import mixture from '../images/mixture.png';

const ProductLayoutList = () => {
  return (
    <Wrapper>
      <div className='product-layout-list'>
        <div className='product-image'>
          <Link to='product-details.html'>
            <img src={mixture} alt='Produce Images' />
          </Link>
        </div>

        <div className='product-content-list'>
          <h4>
            <Link to='/productDetails' className='product-name'>
              Auctor gravida enim
            </Link>
          </h4>
          <div className='price-box'>
            <span className='new-price'>Ksh 1,500</span>
            <span className='old-price'>ksh 2,000</span>
          </div>

          <div className='product-rating'>
            <ul className='d-flex'>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li className='bad-reting'>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
            </ul>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            suscipit aliquam, dignissimos nesciunt, quos voluptas tenetur
            necessitatibus voluptate vitae quo quibusdam nihil.
          </p>
        </div>

        <div className='product-action-area'>
          <ul className='stock-cont'>
            <li className='product-sku'>
              Sku: <span>P006</span>
            </li>
            <li className='product-stock-status'>
              Availability: <span className='in-stock'>In Stock</span>
            </li>
          </ul>
          <div className='product-button'>
            <ul className='actions'>
              <li className='add-to-wishlist'>
                <Link to='wishlist.html' className='add_to_wishlist'>
                  <i className='icon-heart'></i> Add to Wishlist
                </Link>
              </li>
            </ul>
            <div className='add-to-cart-btn-container'>
              <button className='btn add-to-cart-btn'>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className='product-layout-list'>
        <div className='product-image'>
          <Link to='product-details.html'>
            <img src={mixture} alt='Produce Images' />
          </Link>
        </div>

        <div className='product-content-list text-left'>
          <h4>
            <Link to='product-details.html' className='product-name'>
              Auctor gravida enim
            </Link>
          </h4>
          <div className='price-box'>
            <span className='new-price'>Ksh 1,500</span>
            <span className='old-price'>ksh 2,000</span>
          </div>

          <div className='product-rating'>
            <ul className='d-flex'>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
              <li className='bad-reting'>
                <Link to='#'>
                  <i className='icon-star'></i>
                </Link>
              </li>
            </ul>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            suscipit aliquam, dignissimos nesciunt, quos voluptas tenetur
            necessitatibus voluptate vitae quo quibusdam nihil.
          </p>
        </div>

        <div className='product-action-area'>
          <ul className='stock-cont'>
            <li className='product-sku'>
              Sku: <span>P006</span>
            </li>
            <li className='product-stock-status'>
              Availability: <span className='in-stock'>In Stock</span>
            </li>
          </ul>
          <div className='product-button'>
            <ul className='actions'>
              <li className='add-to-wishlist'>
                <Link to='wishlist.html' className='add_to_wishlist'>
                  <i className='icon-heart'></i> Add to Wishlist
                </Link>
              </li>
            </ul>
            <div className='add-to-cart-btn-container'>
              <button className='btn add-to-cart-btn'>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className='product-layout-list'>
        <div className='product-image'>
          <a to='product-details.html'>
            <img src={mixture} alt='Produce Images' />
          </a>
        </div>

        <div className='product-content-list text-left'>
          <h4>
            <a to='product-details.html' className='product-name'>
              Auctor gravida enim
            </a>
          </h4>
          <div className='price-box'>
            <span className='new-price'>Ksh 1,500</span>
            <span className='old-price'>ksh 2,000</span>
          </div>

          <div className='product-rating'>
            <ul className='d-flex'>
              <li>
                <a to='#'>
                  <i className='icon-star'></i>
                </a>
              </li>
              <li>
                <a to='#'>
                  <i className='icon-star'></i>
                </a>
              </li>
              <li>
                <a to='#'>
                  <i className='icon-star'></i>
                </a>
              </li>
              <li>
                <a to='#'>
                  <i className='icon-star'></i>
                </a>
              </li>
              <li className='bad-reting'>
                <a to='#'>
                  <i className='icon-star'></i>
                </a>
              </li>
            </ul>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            suscipit aliquam, dignissimos nesciunt, quos voluptas tenetur
            necessitatibus voluptate vitae quo quibusdam nihil.
          </p>
        </div>

        <div className='product-action-area'>
          <ul className='stock-cont'>
            <li className='product-sku'>
              Sku: <span>P006</span>
            </li>
            <li className='product-stock-status'>
              Availability: <span className='in-stock'>In Stock</span>
            </li>
          </ul>
          <div className='product-button'>
            <ul className='actions'>
              <li className='add-to-wishlist'>
                <a to='wishlist.html' className='add_to_wishlist'>
                  <i className='icon-heart'></i> Add to Wishlist
                </a>
              </li>
            </ul>
            <div className='add-to-cart-btn-container'>
              <button className='btn add-to-cart-btn'>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProductLayoutList;
const Wrapper = styled.section`
  margin-bottom: 2em;
  line-height: 1.5em;

  .product-layout-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2em;
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
  .add-to-cart-btn {
    margin: 0 auto;
  }
  .product-content-list h4 a {
    font-size: 1rem;
  }
  @media (min-width: 800px) {
    Wrapper {
      border: 2px solid red;
    }
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
`;
