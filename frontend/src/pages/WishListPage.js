import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { addToWishList, removeFromWishList } from '../actions/wishListActions'
import Message from '../components/Message'
import { formatPrice } from '../utils/helpers'

const WishListPage = (props) => {
  const productId = props.match.params.id
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1
  const wishList = useSelector((state) => state.wishList)
  const { wishListItems, error } = wishList
  const dispatch = useDispatch()
  useEffect(() => {
    if (productId) {
      dispatch(addToWishList(productId, qty))
    }
  }, [dispatch, productId, qty])

  const removeFromWishListHandler = (id) => {
    // delete action
    dispatch(removeFromWishList(id))
  }

  if (wishListItems.length === 0) {
    return (
      <Wrapper>
        <div className='row section-center'>
          <h3 className='sub-heading'>wishlist</h3>
          <h1 className='heading'>your wishlist</h1>
          <Message
            message='Oops! your wish list is empty'
            buttonText='Go shopping'
            url='/products'
          />
        </div>
      </Wrapper>
    )
  }

  if (error) {
    return (
      <Wrapper>
        <div className='row section-center'>
          <h3 className='sub-heading'>wishlist</h3>
          <h1 className='heading'>your wishlist</h1>
          <Message
            message='Error Loading Your wish List'
            name='hide'
            variant='danger'
          />
        </div>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='row section-center'>
        <h3 className='sub-heading'>wishlist</h3>
        <h1 className='heading'>your wishlist</h1>
        <form className='cart-table'>
          <table className='table'>
            <thead>
              <tr>
                <th className='plantmore-product-thumbnail'>Images</th>
                <th className='cart-product-name'>Product</th>
                <th className='plantmore-product-price'>Unit Price</th>
                <th className='plantmore-product-stock-status'>Stock Status</th>
                <th className='plantmore-product-add-cart'>add to cart</th>
                <th className='plantmore-product-remove'>Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishListItems.map((item) => {
                return (
                  <tr key={item.name}>
                    <td className='plantmore-product-thumbnail'>
                      <Link to='#'>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </td>
                    <td className='plantmore-product-name'>
                      <Link to='#'>{item.name}</Link>
                    </td>
                    <td className='plantmore-product-price'>
                      <span className='amount'>{formatPrice(item.price)}</span>
                    </td>
                    <td className='plantmore-product-stock-status'>
                      {item.countInStock > 0 ? (
                        <span className='out-stock'>in stock</span>
                      ) : (
                        <span className='out-stock'>out stock</span>
                      )}
                    </td>
                    <td className='plantmore-product-add-cart'>
                      <Link
                        className='btn'
                        to={`/cart/${productId}?qty=${qty}`}
                      >
                        add to cart
                      </Link>
                    </td>
                    <td className='plantmore-product-remove'>
                      <button
                        type='submit'
                        className='remove-btn'
                        onClick={() => removeFromWishListHandler(item.product)}
                      >
                        <FaTimes />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </form>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin: 12rem auto;
  .cart-table {
    overflow-x: auto;
  }
  img {
    width: 10rem;
  }
  .remove-btn {
    background: none;
  }
  .alert {
    text-align: center;
  }
`

export default WishListPage
